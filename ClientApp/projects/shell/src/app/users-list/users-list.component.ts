import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpApiService } from 'projects/api-lib/src/lib/api-service/http-api.service';
import Globals from '../services/globals';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UserListComponent implements OnInit {


  @Output()
  onSelectUser: EventEmitter<number> =  new EventEmitter();
  @Output()
  onResultDelete: EventEmitter<number> =  new EventEmitter();
  
  constructor(private httpApi: HttpApiService, 
              private router: Router) { }

  dataSource:any=[]
  ngOnInit(): void {
    debugger;
    this.getUsers();     
  }

  deleteUser(id:number){
    debugger;
    this.httpApi.delete(Globals.UrlUser, id).subscribe(res=>{
      this.onResultDelete.next(id);
      this.getUsers();
      this.onSelectUser.next(0);
    });
  }

  getUsers(){
    this.httpApi.get(Globals.UrlUser ).subscribe(res=> {
      this.dataSource = res;
    });
  }

  editUser(id){
    this.router.navigateByUrl(`/user-view/${id}`)
  }

  showDetail(id:number){
    debugger;
    this.httpApi.selectedUser(id);
    this.onSelectUser.next(id);
  }

}
