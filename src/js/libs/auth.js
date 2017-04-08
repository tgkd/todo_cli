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
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.auth.login.method,
        url: this.auth.login.url,
        data: {
          ...credentials,
          session: session
        }
      })
        .then(user => {
          resolve(user)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.auth.logout.method,
        url: this.auth.logout.url
      })
        .then(logout => {
          resolve(logout)
        })
        .catch(e => {
          reject(e)
        })
    })


  }

  register(credentials, session) {
    return new Promise((resolve, reject) => {
      this.api.request({
        method: this.auth.register.method,
        url: this.auth.register.url,
        data: {
          ...credentials,
          session: session
        }
      })
        .then(user => {
          resolve(user)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  getUser(email) {
    return new Promise((resolve, reject) => {
      this.api.request({
        method: this.auth.getUser.method,
        url: this.auth.getUser.url,
        data: {
          'email': email
        }
      })
        .then(user => {
          resolve(user)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

}

export default Auth;