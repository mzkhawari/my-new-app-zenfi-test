import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService implements OnInit {

  constructor(private _formBuilder: FormBuilder) {   //private toastr: ToastrService  

    this.configForm = this._formBuilder.group({
      title: 'حذف',
      message: 'آیا از حذف اطمینان دارید؟? <span class="font-medium"></span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'حذف',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'بستن'
        })
      }),
      dismissible: true
    });
  }

  configForm: FormGroup;
  ngOnInit(): void {

  }






  //config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  //position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;

  title = 'Warning';
  content = `Please Attention to Error!`;


  
  showToast(type: NbToastStatus, title: string, body: string) {
    const titleContent = title ? `${title}` : '';
    this.index += 1;
    //this._snackBar.open(body, null, { duration: 3000, panelClass: 'my-custom-snackbar' });
  }


  // confirmDelete() {
  //   const dialogRef = this._fuseConfirmationService.open(this.configForm.value);
  //   return dialogRef.afterClosed();
  // }





}


export enum NbToastStatus {
  DEFAULT,
  DANGER,
  INFO,
  PRIMARY,
  SUCCESS,
  WARNING,
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
     
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}