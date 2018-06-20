export class LessonServiceClient {
  findLessonsForModule(courseId, moduleId) {
    return fetch('http://saluja-summer1-2018.herokuapp.com/api/course/' + courseId + '/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
