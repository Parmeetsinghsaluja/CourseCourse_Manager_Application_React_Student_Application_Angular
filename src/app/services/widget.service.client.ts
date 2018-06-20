export class WidgetServiceClient {
  findWidgetsForLesson(topicId) {
    return fetch('http://saluja-summer1-2018.herokuapp.com/api/widget' + topicId)
      .then(response => response.json());
  }
}
