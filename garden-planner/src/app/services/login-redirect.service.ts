import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('auth_token')) {
      this.router.navigateByUrl('/gardens')
      return false;
    }
    else {
      return true;
    }
  }
}
