import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username: String = "";
  password: String = "";

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userLoginClick() {
    const user = {
      username: this.username,
      password: this.password
    };
    if(user.username == "") {
      this.flashMessages.show("Enter username", {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      return
    }
    if(user.password == "") {
      this.flashMessages.show("Enter password", {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      return
    }
    this.authService.authUser(user).subscribe(data => {
      if(!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      } else {
        this.flashMessages.show("Logined successfully", {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['/dashboard']);
        this.authService.storeUser(data.token, data.user);
      }
    });
  }
}
