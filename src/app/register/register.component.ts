import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) {
  }

  username;
  password;
  password2;

  register(username, password, password2) {
    username == null || password == null ? alert("Username/Password Can't be empty") :
      password !== password2 ? alert("Password and VerifyPassword does not match") :
        this.service
          .createUser(username, password)
          .then((promise) => {
            promise.Status !== "Username Taken" ? this.router.navigate(['profile']) : alert("Username Taken");
          });
  }

  ngOnInit() {}

}
