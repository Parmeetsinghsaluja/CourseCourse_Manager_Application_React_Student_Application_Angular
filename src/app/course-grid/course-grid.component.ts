import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {SectionServiceClient} from "../services/section.service.client";
import {Course} from "../models/coruse.model.client";


@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService: UserServiceClient,
              private sectionService: SectionServiceClient) { }

  courses: Course[] = [];
  sections;
  userId;
  grade = 'NA';
  role = null;
  displayEnroll(courseId) {
    let boolean = true;
    for (const res of this.sections){
        if (res.section == null) {
          return boolean;
        }
        if (res.section.courseId === courseId) {
          boolean = false;
        }
    }
    return boolean;
  }
  callback(response) {
    return response.json();
  }
  ngOnInit() {
    this.service.findAllCourses()
      .then(courses => this.courses = courses);

    this.userService
      .profile()
      .then((response) => response.status === 403 ?
        this.role = null :
        this.callback(response)
          .then((user) => {
            this.role = user.role;
            this.userId = user.userId;
            this.sectionService
              .findSectionsForStudent()
              .then(sections => this.sections = sections );
          }));
  }

}
