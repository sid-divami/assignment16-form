import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from '../model/user';
import { CrudService, getUniqueId } from '../service/crud.service';
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
})

/* Initializing formGroup for user-data inside of form-component.
 */
export class FormComponentComponent {
  constructor(private router: Router, private httpService: CrudService) {}

  newUser: User = new User();
  // Random ID generator exported from service for unique identification.
  randomId = getUniqueId(2);
  // Additional Data received from dynamic child component.
  dataFromChild: string = '';

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
    age: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(999),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl<number>(0, [
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
      console.log(this.userInfo.value);
      // this.submittedData = { ...this.userInfo.value };
      console.log(typeof this.userInfo.value.age);

      this.newUser = {
        firstName: this.userInfo.value.firstName ?? '',
        lastName: this.userInfo.value.lastName ?? '',
        email: this.userInfo.value.email ?? '',
        userName: this.userInfo.value.userName ?? '',
        age: this.userInfo.value.age ?? 0,
        id: this.randomId ?? '',
      };
      // Make a POST request to the mock backend using CrudService
      this.httpService.addUser(this.newUser).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );

      this.router.navigate(['success'], {
        state: {
          submittedData: this.newUser,
          AdditionalData: this.dataFromChild,
        },
      });
    }
    // this.validateUserData();
    // console.log(this.userInfo);
  }
}
