import { Component, OnInit, Output } from '@angular/core';
import { HttpApiService } from 'projects/api-lib/src/lib/api-service/http-api.service';
import { UserDto } from 'projects/api-lib/src/lib/models/user.dto';
import Globals from 'projects/shell/src/app/services/globals';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {

  
  constructor(private httpApi: HttpApiService) {

  }

  userdetail:UserDto;
  ngOnInit() {  


    //let eventValue = 
    fromEvent<CustomEvent>(window, 'app-event-bus').subscribe((e) =>   this.onEventHandler(e));   
        
  }

  onEventHandler(e: CustomEvent) {
    debugger;
    if (e.detail.eventType === 'share-id') {
      let id = e.detail.customData;
      this.httpApi.getById(Globals.UrlUser, id).subscribe(res=>{
        res as UserDto;
        this.userdetail = res;
      })
    }
  }



}
