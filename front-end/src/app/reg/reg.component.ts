import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  username: String = "";
  email: String = "";
  password: String = "";

  constructor(private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userRegisterClick() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.checkForm.checkUsername(user.username)) {
      this.flashMessages.show("Name of user undefined", {
        cssClass: 'alert-danger',
        timeout: 5000
      })
      console.log("Name of user undefined");
      return false
    } else if(!this.checkForm.checkEmail(user.email)) {
      this.flashMessages.show("Email undefined", {
        cssClass: 'alert-danger',
        timeout: 5000
      })
      console.log("Email undefined");
      return false
    } else if(!this.checkForm.checkPassword(user.password)) {
      this.flashMessages.show("Password undefined", {
        cssClass: 'alert-danger',
        timeout: 5000
      })
      console.log("Password undefined");
      return false
    }
    this.authService.registerUser(user).subscribe(data => {
      if(!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.router.navigate(['/reg']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['/auth']);
      }
    });
    return true
  }
}
