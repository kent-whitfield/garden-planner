import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = 'http://localhost:5000';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST'
  });

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(this.baseURL + '/user/login', user, {headers: this.headers});
  }

  register(user: User): Observable<any> {
    return this.http.post(this.baseURL + '/user/register', user, {headers: this.headers});
  }
}
