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

  async login(credentials, session) {
    return await this.api.request({
      method: this.auth.login.method,
      url: this.auth.login.url,
      data: {
        ...credentials,
        session: session
      }
    });
  }

  async logout() {
    return await this.api.request({
      method: this.auth.logout.method,
      url: this.auth.logout.url
    });
  }

  async register(credentials, session) {
    return await this.api.request({
      method: this.auth.register.method,
      url: this.auth.register.url,
      data: {
        ...credentials,
        session: session
      }
    })
  }

  async getUser(email) {
    return await this.api.request({
      method: this.auth.getUser.method,
      url: this.auth.getUser.url,
      data: {
        'email': email
      }
    });
  }

}

export default Auth;