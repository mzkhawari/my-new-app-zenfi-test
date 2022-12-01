import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { USER_DETAIL_ROUTES } from './detailuser.routes';
import { UserInfoComponent } from './component/user-info.component';
import { ApiLibModule } from 'projects/api-lib/src/api-lib.module';

@NgModule({
  imports: [
    CommonModule,
    ApiLibModule,
    RouterModule.forChild(USER_DETAIL_ROUTES)
  ],
  declarations: [
    UserInfoComponent
  ]
})
export class DetailUserModule { }
