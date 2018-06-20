export class UserServiceClient {

  findUserById(userId) {
    return fetch('http://desolate-fortress-93443.herokuapp.com/api/user/' + userId)
      .then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('http://desolate-fortress-93443.herokuapp.com/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  logout() {
    return fetch('http://desolate-fortress-93443.herokuapp.com/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch('http://desolate-fortress-93443.herokuapp.com/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      })
      .then(response => response);
  }

  updateUser(userId, username, firstName, lastName, email, address, phoneNumber) {
    const user = {
      userId : userId,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      phoneNumber: phoneNumber
    };
    return fetch('http://desolate-fortress-93443.herokuapp.com/api/user', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  createUser(username, password) {
    const role = username.toLowerCase() === "admin" ? "admin" : "student";
    const user = {
      username: username,
      password: password,
      role: role
    };
    return fetch('http://desolate-fortress-93443.herokuapp.com/api/user', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }
}
