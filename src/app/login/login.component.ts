import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitDisable: Boolean = true;
  constructor(private apiService: ApiService, private router: Router) { }
  // constructor() {}

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  isValid() {
    return !this.passwordFormControl.valid || !this.emailFormControl.valid;
  }

  login() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    console.log('user name ', email, password);
    this.apiService.authenticateUser({email,password}).subscribe((response) => {
      console.log('Response ', response);
      localStorage.setItem('token', response.accessToken);
      this.router.navigate(['admin']);
      this
    }, err => console.error('Error ', err));
  }

}
