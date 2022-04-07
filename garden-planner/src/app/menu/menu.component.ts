import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnounceService } from '../announce.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loggedIn: boolean;

  constructor(private router: Router, private announceService: AnnounceService) {
    this.announceService.loginStatus$.subscribe(status => this.loggedIn = status);
   }

  ngOnInit(): void {
    if (localStorage.getItem('auth_token')) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
    this.announceService.emitLoginStatus(this.loggedIn)
  }

  logoutUser() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.announceService.emitLoginStatus(this.loggedIn)
    this.router.navigateByUrl('login');
  }
}
