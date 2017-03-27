import axios from 'axios';
import api from './config';

class Auth {
  constructor() {
    this.auth = api.methods.auth;
    this.apiHost = api.backendUrl;
  }

  login(credentials, session) {
    return axios.request({
      method: this.auth.login.method,
      url: this.apiHost + this.auth.login.url,
      data: {
        ...credentials,
        session: session
      }
    })
  }

  logout() {
    return axios.request({
      method: this.auth.logout.method,
      url: this.apiHost + this.auth.logout.url
    })
  }

  register(credentials, session) {
    return axios.request({
      method: this.auth.register.method,
      url: this.apiHost + this.auth.register.url,
      data: {
        ...credentials,
        session: session
      }
    })
  }

  getUser(email) {
    return axios.request({
      method: this.auth.getUser.method,
      url: this.apiHost + this.auth.getUser.url,
      data: {
        'email': email
      }
    })
  }

}

export default Auth;