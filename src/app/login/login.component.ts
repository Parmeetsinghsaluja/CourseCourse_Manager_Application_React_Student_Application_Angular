import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;
  login(username, password) {
    username == null || password == null ? alert("Username/Password Can't be empty") :
    this.service
      .login(username, password)
      .then((user) => {
        user == null ? alert("Wrong Username/Password") : this.router.navigate(['profile']);
      });
  }

  constructor(private router: Router,
              private service: UserServiceClient) { }
  ngOnInit() {
    this.service
    .profile()
    .then((response) => response.status === 403 ?
      this.router.navigate(['login']) : this.router.navigate(['home']));
  }

}
