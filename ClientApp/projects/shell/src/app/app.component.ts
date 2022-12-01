import { Component, ViewChild, ViewContainerRef, Inject, Injector, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {
  title = 'shell';

  constructor(http: HttpClient) {
    
    

  }


}

