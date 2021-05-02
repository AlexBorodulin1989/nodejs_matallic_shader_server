import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  username: String = "";
  email: String = "";
  password: String = "";

  constructor(private chechForm: CheckFormService) { }

  ngOnInit(): void {
  }

  userRegisterClick() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.chechForm.checkUsername(user.username)) {
      console.log("Name of user undefined");
      return false
    } else if(!this.chechForm.checkEmail(user.email)) {
      console.log("Email undefined");
      return false
    } else if(!this.chechForm.checkPassword(user.password)) {
      console.log("Password undefined");
      return false
    }
    console.log("Success");
  }
}
