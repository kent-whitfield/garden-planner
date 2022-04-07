import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'garden-planner';
  loggedIn: boolean;

  ngOnInit(): void {
    if (localStorage.getItem('auth_token')) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
  }

}
