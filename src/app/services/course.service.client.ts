export class CourseServiceClient {
  COURSE_URL = 'http://saluja-summer1-2018.herokuapp.com/api/course';
  findAllCourses() {
    return fetch(this.COURSE_URL)
      .then(response => response.json());
  }
  findCourseById(courseId) {
    return fetch(this.COURSE_URL + courseId)
      .then(response => response.json());
  }
}
