import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    
  }

  @ViewChild('placeHolder', { read: ViewContainerRef })  viewContainer!: ViewContainerRef;
  async load(): Promise<void> {
 
    // const m = await import('datailUser/Component');
    // const ref = this.viewContainer.createComponent(m.UserInfoComponent);
    // const compInstance = ref.instance;
    // (compInstance as any).ngOnInit()
    debugger;
    this.viewContainer.remove();
    const m = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      exposedModule: './Component'
    });
    const ref = this.viewContainer.createComponent(m.UserInfoComponent);
    const compInstance = ref.instance;
    (compInstance as any).ngOnInit()
  }







  @ViewChild('mySidenav') private _mySidenav: ElementRef;
  openNav(id:number) {
    this.closeNav();
    if(id==0){
      return ;
    }
    setTimeout(() => {
      const busEvent = new CustomEvent('app-event-bus', {
        bubbles: true,
        detail: {
          eventType: 'share-id',
          customData: id
        }
      });
      dispatchEvent(busEvent);
      this._mySidenav.nativeElement.style.width = "250px";
    }, 500);

    this.load();
  }
  
  /* Set the width of the side navigation to 0 */
  closeNav() {
    this._mySidenav.nativeElement.style.width = "0";
  }

  onResultDelete($event){
    this.closeNav();
  }
  

}
