import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApiService } from 'projects/api-lib/src/lib/api-service/http-api.service';
import { UserDto } from 'projects/api-lib/src/lib/models/user.dto';
import Globals from '../services/globals';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit {


  @Output()
  onSelectUser: EventEmitter<number> =  new EventEmitter();
  @Output()
  OnSave: EventEmitter<UserDto> =  new EventEmitter();

  model:UserDto;
  constructor(private httpApi: HttpApiService, 
              private activedRoute: ActivatedRoute,
              private router: Router,
              private toastMessageService : ToastMessageService) { }

  dataSource:any=[]
  ngOnInit(): void {
    this.httpApi.get(Globals.UrlUser).subscribe(res=> {
      this.dataSource = res;
    });    

    let id = this.activedRoute.snapshot.params['id'];
      if(id!=undefined && id >0){
        this.getItem(id);     
      }else{
        this.model = new UserDto;
      } 
  }

  titleFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email ]);

  matcher = new MyErrorStateMatcher();  

  resultpost="";
  isLoading:boolean=false;
  OnSubmit(form:NgForm){
   
    let id = this.model.id
    if(!this.matcher.isErrorState(this.titleFormControl, form) &&
       !this.matcher.isErrorState(this.emailFormControl, form)){
        if(id==undefined || id==0){
          this.model.id =0;
          this.httpApi.post(Globals.UrlUser, this.model).subscribe(res=>{
            if(res){
              this.resultpost = "it Saved Successfully!";
              this.model = new UserDto();
            }else{
              this.resultpost ="it occure with Error!";
            }
            
          });
        }else{
          this.httpApi.put(Globals.UrlUser, this.model).subscribe(res=>{
            if(res){
              this.resultpost = "it Update Successfully!";
              this.model = new UserDto();
            }else{
              this.resultpost ="it occure with Error!";
            }
            
          });
        }
    } else{
      this.resultpost = "Please Fill All Filed!";
    }
  }

  backToList(){
    this.router.navigateByUrl("/");
  }

  private getItem(id){     
    this.isLoading = true;
    this.httpApi.getById(Globals.UrlUser, id).subscribe(res=>{
      this.model = res ;     
      if(this.model==undefined){        
        this.router.navigateByUrl("/user-list");       
      }
      this.isLoading = false;
    },
     error =>{
      this.isLoading = false;
    });
  }
}

