export class SectionServiceClient {

  SECTION_URL = 'http://desolate-fortress-93443.herokuapp.com/api/course/COURSEID/section';
  DELETE_SECTION_URL = 'http://desolate-fortress-93443.herokuapp.com/api/section';

  findSectionsForStudent() {
    const url = 'http://desolate-fortress-93443.herokuapp.com/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'http://desolate-fortress-93443.herokuapp.com/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }
  unenrollStudentInSection(sectionId) {
    const url = 'http://desolate-fortress-93443.herokuapp.com/api/section/' + sectionId + '/unenrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }
  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  createSection(courseId, courseName, name, seats) {
    const section = {courseId, courseName, name, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  deleteSection(section) {
    return fetch(this.DELETE_SECTION_URL, {
      method: 'delete',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  updateSection(sectionId, courseId, name, seats) {
      const section = {_id: sectionId,
        courseId: courseId,
        name: name,
        seats: seats};
    return fetch(this.DELETE_SECTION_URL, {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
