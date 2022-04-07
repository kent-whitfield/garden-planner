import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {
  private emitChangeSource = new Subject<boolean>();
  loginStatus$ = this.emitChangeSource.asObservable();

  constructor() { }

  emitLoginStatus(status: boolean) {
    this.emitChangeSource.next(status);
  }
}
