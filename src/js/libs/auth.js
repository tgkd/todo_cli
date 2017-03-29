import axios from 'axios';
import api from './config';

class Auth {
  constructor() {
    this.auth = api.methods.auth;
    this.api = axios.create({
      baseURL: api.backendUrl,
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  login(credentials, session) {
    return this.api.request({
      method: this.auth.login.method,
      url: this.auth.login.url,
      data: {
        ...credentials,
        session: session
      }
    })
  }

  logout() {
    return this.api.request({
      method: this.auth.logout.method,
      url: this.apiHost + this.auth.logout.url
    })
  }

  register(credentials, session) {
    return this.api.request({
      method: this.auth.register.method,
      url: this.auth.register.url,
      data: {
        ...credentials,
        session: session
      }
    })
  }

  getUser(email) {
    return this.api.request({
      method: this.auth.getUser.method,
      url: this.auth.getUser.url,
      data: {
        'email': email
      }
    })
  }

}

export default Auth;