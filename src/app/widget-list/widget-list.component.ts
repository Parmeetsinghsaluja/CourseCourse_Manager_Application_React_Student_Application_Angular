import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WidgetServiceClient} from "../services/widget.service.client";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  constructor(private service: WidgetServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setContext(params));
  }

  context;
  topicId;
  widgets = [];
  setContext(params) {
    this.topicId = params['topicId'];
    this.loadWidgets(this.topicId);
  }
  loadWidgets(topicId) {
    this.topicId = topicId;
    this.service.findWidgetsForLesson(topicId)
      .then(widgets => this.widgets = widgets);
  }

  ngOnInit() {
  }

}
