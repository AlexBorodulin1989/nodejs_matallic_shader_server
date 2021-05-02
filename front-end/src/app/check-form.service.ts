import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkUsername(username: String) {
    if(username.length == 0)
      return false;
    else
      return true;
  }

  checkEmail(email: String) {
    if(email.length == 0)
      return false;
    else
      return true;
  }

  checkPassword(password: String) {
    console.log(password);
    if(password.length == 0)
      return false;
    else
      return true;
  }
}
