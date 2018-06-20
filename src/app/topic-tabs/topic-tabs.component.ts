import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TopicServiceClient} from "../services/topic.service.client";

@Component({
  selector: 'app-topic-tabs',
  templateUrl: './topic-tabs.component.html',
  styleUrls: ['./topic-tabs.component.css']
})
export class TopicTabsComponent implements OnInit {

  constructor(private service: TopicServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));
  }

  courseId;
  moduleId;
  lessonId;
  topicId;
  topics = [];

  setParams(params) {
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    this.topicId = params['topicId'];
    this.loadTopics(this.courseId, this.moduleId, this.lessonId);
  }

  loadTopics(courseId, moduleId, lessonId) {
    this.courseId = courseId;
    this.moduleId = moduleId;
    this.lessonId = lessonId;
    this.service.findTopicsForLesson(courseId, moduleId, lessonId)
      .then(topics => this.topics = topics);
  }

  ngOnInit() {
  }

}
