export class CourseNavigatorServiceClient {
  findAllCourses() {
    return fetch('http://saluja-summer1-2018.herokuapp.com/api/course')
      .then(response => response.json());
  }
  findAllModulesForCourses(courseId) {
    return fetch('http://saluja-summer1-2018.herokuapp.com/api/course/' + courseId + '/module')
      .then(response => response.json());
  }
}
