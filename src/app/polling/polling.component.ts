import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ApiService } from '../services/api.service';


import { MatSnackBar } from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.scss']
})
export class PollingComponent implements OnInit {

 
  public labelPosition = '';
  public emailVoteStatus = false;
  submitDisable = true;

  public candidates = [];

  constructor(public apiService: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCandidates();
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  getCandidates() {
    this.apiService.getCandidate().subscribe((response) => {
      console.log('Response ', response);
      this.candidates = response.map(candidate => ({id: candidate.id, value: candidate.firstName + ' ' + candidate.lastName}));
    }, err => console.error(err));
  }

  checkUserVote() {
    this.emailVoteStatus = false;
    const email = this.emailFormControl.value;
    if(!this.emailFormControl.valid) {
      this.openSnackBar('Email Not Valid');
    } else {
      this.apiService.emailCheck(email).subscribe(res => {
        console.log('Response ', res);
        if(res.apiStatus == true) {
          this.emailVoteStatus = true;
          this.openSnackBar('Ready to vote')
        }
      }, err => console.error(err));
    }
  }
  vote() {
    this.apiService.updatVote({email: this.emailFormControl.value, candidate_id: this.labelPosition }).subscribe(res => {
      this.openSnackBar('Voted successfully');
      this.emailFormControl.setValue('');
      this.labelPosition = ''
    }, err => console.error(err))
  }
  openSnackBar(message) {
    this._snackBar.open(message, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
