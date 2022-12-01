import { Injectable, Inject, InjectionToken, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, of, throwError, BehaviorSubject} from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators'

import { UserDto } from '../models/user.dto';
import { ErrorModel } from '../models/error-model.dto';

//export const API_CLIENT_SERVICE_BASE_URL = new InjectionToken<string> ('ApiClientServiceBaseUrl');

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private urlServer ="api/";
  public currentUserSubject: BehaviorSubject<UserDto>;
  private currentUser!: Observable<UserDto>;
  constructor( 
    private http :HttpClient ) {
      this.urlServer = "api/";// "http://localhost:5134/" ;// inject(API_CLIENT_SERVICE_BASE_URL);

      let data = localStorage.getItem('currentUser');
      if(data!=undefined && data!= ""){
        this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(data));
        this.currentUser =  this.currentUserSubject.asObservable();
      }else{
        this.currentUserSubject = new BehaviorSubject<UserDto>(new UserDto(0));
      }
    }
  
    setCurrentUserSubject(userJson: string){
      this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(userJson));
      return this.currentUserSubject;    
    }


  
  private getJsonHttpHeaders() {

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,x-custom-header',
      'Access-Control-Allow-Methods': 'PUT,POST,DELETE,GET,GETITEM,OPTIONS',
    });
  }

  private getPOSTJsonHttpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,x-custom-header',      
    });
  }
  
  data = [
  {id :1 , name:'Jack', email:'jack@gmail.com'},
  {id :2 , name:'Filip', email:'Filip@gmail.com'},
  {id :3 , name:'Jan', email:'Jan@gmail.com'}]


  userId :number;
  public get UserId():number{
    return this.userId;
  }    
  selectedUser(userId:number){
    this.userId =  userId;
  };

  

  get(url:string):Observable<any>{
      //return  of(this.data)
       return this.http.get(this.urlServer + url + "/Get" , {headers: this.getJsonHttpHeaders()}).pipe(
           catchError(this.handleError)
       );       
  };

  getById(url:string, id:number):Observable<any>{
    return this.http.get(this.urlServer + url + `/Get/${id}`, { headers: this.getJsonHttpHeaders()})    
     .pipe(
       catchError(this.handleError) // then handle the error
     );
    //return  of(this.data.filter(f=>f.id==id)[0])    
  };

  post<T>(url: string , data?: any) : Observable<any>{
    return this.http.post<T>(this.urlServer + url, data, { headers: this.getPOSTJsonHttpHeaders()})    
     .pipe(
       catchError(this.handleError) // then handle the error
     );
  }

  put<T>(url: string , data?: any) : Observable<any>{
    return this.http.put<T>(this.urlServer + url +`/Put` , data, { headers: this.getJsonHttpHeaders()})    
     .pipe(
     //  // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  }  

  delete<T>(url: string, id:number): Observable<any>{
    return this.http.delete<any>(this.urlServer+ url+ `/delete/${id}`, {headers: this.getJsonHttpHeaders()})
    .pipe(
      // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  }
  

  private handleError(error: HttpErrorResponse) {
    debugger;
    let errorModel = new ErrorModel();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorModel.Status = 0;
      errorModel.Message = error.error.message;                    
      return throwError(errorModel);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      
      console.log(error);
      var err = error;      
      var errors:any=[];
      if (err.status === 400) {
        let errorMessage ='';
        let validationErrorDictionary = err.error.ModelState ;
        for (var fieldName in validationErrorDictionary) {
            if (validationErrorDictionary.hasOwnProperty(fieldName) && fieldName != "$id") {
                errors.push({filed: fieldName , error: validationErrorDictionary[fieldName].join()});
                errorMessage +=`${fieldName}: ${validationErrorDictionary[fieldName].join()} `;
            }
        } 
        errorModel.Message = errorMessage;
        errorModel.Status =400;
        errorModel.OrginError = error;        
        return throwError(errorModel);
      }else if (err.status === 401) {
        if(err.message.includes("api/auth/sign-in")){
          errorModel.Status =401;
          errorModel.OrginError = error;        
          errorModel.Message = "Please Login With Correct Username & Password."; 
          return throwError(errorModel);
        }
        if(err.message.includes("api/auth/refreshToken")){
          errorModel.Status =401;
          errorModel.OrginError = error;              
          errorModel.Message ="Please Login again, Your Session is Expired."    
          return throwError(errorModel);
        }else{
          errorModel.Status =401;
          errorModel.Message = "Please Login again, Your Session is Expired."                    
          return throwError(errorModel);  
        }
          //return err;// throwError(err.message);
      }else if (err.status === 500) {
        if(err.error.ExceptionMessage !=undefined){
          errorModel.Status =500;
          errorModel.Message = err.error.ExceptionMessage;                    
          return throwError(errorModel);
        }
        else if(err.error.Message !=undefined){
          errorModel.Status =500;
          errorModel.Message = err.error.Message;                    
          return throwError(()=> errorModel)
        }
        else if(err.error.key!=undefined){
          errorModel.Status =500;
          errorModel.Message = err.error.key.join();                    
          return throwError(errorModel);
        }
        else if(err.error!=undefined){
          errorModel.Status =500;
          errorModel.Message = err.error;                    
          return throwError(errorModel);
        }
      }else if (err.status === 404) {
        errorModel.Status =404;
        errorModel.Message =  err.message;// "Request Fail!, Not Found Error!";                    
        return throwError(errorModel);          //err.message)
      }         
      else {
         errors.push("something went wrong!");
      }
      errorModel.Status =500;
      errorModel.Message = error.message ;// "Unkown Error, Please Call to Admin!";                    
      return throwError(errorModel);
    };
  }
}
