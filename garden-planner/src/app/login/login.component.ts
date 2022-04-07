import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sample } from 'rxjs';
import { AuthService } from '../auth.service';
import { AnnounceService } from '../announce.service';
import { User } from '../model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User;
  errorMsg: string;

  constructor(private router: Router, private authService: AuthService, private announceService: AnnounceService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.login(this.user)
      .subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem('auth_token', data['auth_token']);
          this.announceService.emitLoginStatus(true);
          this.errorMsg = ""
          this.user = new User;
          this.router.navigateByUrl('/gardens');
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = err.error.message;
        }
      })
  }
}
