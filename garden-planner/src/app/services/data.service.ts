import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { Seed } from '../model/seed';
import { Garden } from '../model/garden';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL: string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getSeeds(): Observable<any> {
    return this.http.get(this.baseURL + "/data/seeds")
  }

  setSeed(seed: Seed): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST'
    });

    const body = JSON.stringify(seed);
    console.log(body);
    return this.http.post(this.baseURL + "/create/seed", body, {headers});
  }

  getUserGardens(): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
    })
    return this.http.get(this.baseURL + "/data/gardens", {headers})
  }

  setGarden(garden: Garden): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
    });

    const body = JSON.stringify(garden);
    console.log(body);
    return this.http.post(this.baseURL + '/create/garden', body, {headers});
  }

  updateGarden(garden: Garden): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
    });

    const body = JSON.stringify(garden)
    return this.http.post(this.baseURL + '/update/garden', body, {headers})
  }
}
