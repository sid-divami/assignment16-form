import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
})

/* Initializing formGroup for user-data inside of form-component.
 */
export class FormComponentComponent {
  constructor(private router: Router) {}
  // receiving additionalData from child
  dataFromChild: string = '';
  submittedData: any;
  // fName: string = '';
  // Form Group with
  userInfo = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(256),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(256),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(999),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    userName: new FormControl(''),
  });

  getCustomVal(val: string) {
    this.dataFromChild = val;
  }

  get firstName() {
    return this.userInfo.get('firstName');
  }

  get email() {
    return this.userInfo.get('email');
  }

  get lastName() {
    return this.userInfo.get('lastName');
  }
  get userName() {
    return this.userInfo.get('userName');
  }
  get age() {
    return this.userInfo.get('age');
  }
  get phone() {
    return this.userInfo.get('phone');
  }

  // //Custom Validation function for formData.
  // validateUserData() {

  // }
  // On Submit Event
  submitUserData() {
    if (this.userInfo.status) {
      this.submittedData = this.userInfo.value;
      this.router.navigate(['success'], {
        state: {
          submittedData: this.submittedData,
          AdditionalData: this.dataFromChild,
        },
      });
    }
    // this.validateUserData();
    // console.log(this.userInfo);
  }
}
