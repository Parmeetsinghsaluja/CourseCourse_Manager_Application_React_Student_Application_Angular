import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {CourseServiceClient} from "../services/course.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router) { }

  user = {};
  username;
  firstName;
  lastName;
  email;
  address;
  role;
  phoneNumber;
  userId;
  sections = [];

  update() {
    this.service
      .updateUser(this.userId, this.username, this.firstName, this.lastName, this.email , this.address , this.phoneNumber);
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }
  unenroll(section) {
    this.sectionService
      .unenrollStudentInSection(section._id)
      .then(() => {
        this.sectionService
          .findSectionsForStudent()
          .then(sections => this.sections = sections );
      });
  }
  callback(response) {
    return response.json();
  }
  ngOnInit() {
    this.service
      .profile()
      .then((response) => response.status === 403 ?
        this.router.navigate(['login']) :
        this.callback(response)
          .then((user) => {
            this.username = user.username;
            this.userId = user._id;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.address = user.address;
            this.phoneNumber = user.phoneNumber;
            this.role = user.role;
          }));

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections );
  }

}
