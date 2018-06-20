import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private router: Router) { }
  role = null;
  callback(response) {
    return response.json();
  }
  ngOnInit() {
    this.service
      .profile()
      .then((response) => response.status === 403 ?
        this.router.navigate(['home']) :
        this.callback(response)
          .then((user) => {
            this.role = user.role;
          }));
  }

}
