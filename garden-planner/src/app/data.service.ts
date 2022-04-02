import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import { Seed } from './model/seed';

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
}
