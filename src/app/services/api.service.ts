import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  authenticateUser(user: object) {
    return this.http.post(`${this.baseUrl}api/auth/signin`, user)
      .pipe(
        map(res => this.handleResponse(res)),
        catchError(err => err)
      );
  }

  getChartResult() {
    return this.http.get(`${this.baseUrl}api/result`)
    .pipe(
      map(res => this.handleResponse(res)),
      catchError(err => err)
    )
  }

  getCandidate() {
    return this.http.get(`${this.baseUrl}api/candidate`)
    .pipe(
      map(res => this.handleResponse(res)),
      catchError(err => err)
    )
  }

  emailCheck(email) {
    return this.http.post(`${this.baseUrl}api/emailcheck`, {email})
    .pipe(
      map(res => this.handleResponse(res)),
      catchError(err => err)
    )
  }

  updatVote(voteObj) {
    return this.http.post(`${this.baseUrl}api/vote`, voteObj)
    .pipe(
      map(res => this.handleResponse(res)),
    catchError(err => err)
    )
  }

  handleResponse(response: any) {
    return response;
  }


}
