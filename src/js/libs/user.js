import axios from 'axios';
import api from './config';

class User {
  constructor() {
    this.user = api.methods.user;
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

  get() {
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.user.getInfo.method,
        url: this.user.getInfo.url
      })
        .then(user => {
          resolve(user)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  update(updatedInfo) {
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.user.updateInfo.method,
        url: this.user.updateInfo.url,
        data: updatedInfo
      })
        .then(user => {
          resolve(user)
        })
        .catch(e => {
          reject(e)
        })
    })

  }

  terminateSession(id) {
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.user.terminateSession.method,
        url: this.user.terminateSession.url,
        params: {
          id: id
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

export default User;