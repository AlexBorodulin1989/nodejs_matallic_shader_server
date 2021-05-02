import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  username: String = "";
  email: String = "";
  password: String = "";

  constructor(private chechForm: CheckFormService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  userRegisterClick() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.chechForm.checkUsername(user.username)) {
      this.flashMessages.show("Name of user undefined", {
        cssClass: 'alert-danger',
        timeout: 5000
      })
      console.log("Name of user undefined");
      return false
    } else if(!this.chechForm.checkEmail(user.email)) {
      this.flashMessages.show("Email undefined", {
        cssClass: 'alert-danger',
        timeout: 5000
      })
      console.log("Email undefined");
      return false
    } else if(!this.chechForm.checkPassword(user.password)) {
      this.flashMessages.show("Password undefined", {
        cssClass: 'alert-danger',
        timeout: 5000
      })
      console.log("Password undefined");
      return false
    }
    console.log("Success");
    return true
  }
}
