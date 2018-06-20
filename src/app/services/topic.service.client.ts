export class TopicServiceClient {
  findTopicsForLesson(courseId, moduleId, lessonId) {
    return fetch('http://saluja-summer1-2018.herokuapp.com/api/course/' + courseId + '/module/' +
      moduleId + '/lesson/' + lessonId + '/topic')
      .then(response => response.json());
  }
}
