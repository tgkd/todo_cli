import axios from 'axios';

class Auth {

  test() {
    return axios.request({
      method: 'get',
      url: 'css/main.css'
    })
  }

  login(credentials, session) {
    return axios.request({
      method: 'post',
      url: '/api/user/login',
      data: {
        'email': credentials.email,
        'password': credentials.password,
        'session': {
          'os': session.os,
          'type': session.type,
          'browser': session.browser
        }
      }
    })
  }

  logout() {
    return axios.request({
      method: 'post',
      url: '/api/user/logout'
    })
  }

  register(credentials, session) {
    return axios.request({
      method: 'post',
      url: '/api/user/register',
      data: {
        'email': credentials.email,
        'password': credentials.password,
        'session': {
          'os': session.os,
          'type': session.type,
          'browser': session.browser
        }
      }
    })
  }

  getUser(email) {
    return axios.request({
      method: 'post',
      url: '/api/user/find_by_email',
      data: {
        'email': email
      }
    })
  }

}

export default Auth;