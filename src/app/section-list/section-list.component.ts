import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {CourseServiceClient} from "../services/course.service.client";

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private userService: UserServiceClient,
              private courseService: CourseServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }
  courseName;
  sectionName = '';
  seats = '';
  courseId = '';
  sections = [];
  sectionId;
  title;
  buttonName= 'Add Section';
  role = null;
  loadSections(courseId) {
    this.courseId = courseId;
    this
      .service
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }
  callback(response) {
    return response.json();
  }
  createSection(sectionName, seats) {
    this
      .service
      .createSection(this.courseId, this.courseName, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }
  deleteSection(section) {
    this
      .service
      .deleteSection(section)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }
  setFields(section) {
    this.sectionName = section.name;
    this.seats = section.seats;
    this.buttonName = 'Update Section';
    this.sectionId = section._id;
  }
  updateSection(sectionName, seats) {
    this
      .service
      .updateSection(this.sectionId, this.courseId, sectionName, seats)
      .then(() => {
      this.loadSections(this.courseId);
    });
    this.buttonName = 'Add Section';
  }
  createOrUpdateSection(courseId, sectionName, seats) {
    this.buttonName === 'Add Section' ?
      this.createSection(sectionName, seats ) :
      this.updateSection(sectionName, seats);
  }
  enroll(section) {
    this.service
      .enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  ngOnInit() {
    this.
    courseService
      .findCourseById(this.courseId)
      .then(course => {
        this.courseName = course.title ;
        this.sectionName = course.title + ' Section 1';
      });
    this.userService
      .profile()
      .then((response) => response.status === 503 ?
        this.router.navigate(['login']) :
        this.callback(response)
          .then((user) => {
            this.role = user.role;
          }));
  }

}
