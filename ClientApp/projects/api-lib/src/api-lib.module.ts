import { NgModule } from '@angular/core';
import { HttpApiService } from './lib/api-service/http-api.service';


@NgModule({
  providers: [HttpApiService],
})
export class ApiLibModule {
  
 }
