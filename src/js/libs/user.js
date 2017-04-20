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

  async get() {
    return await this.api.request({
      method: this.user.getInfo.method,
      url: this.user.getInfo.url
    })
  }

  async update(updatedInfo) {
    return await this.api.request({
      method: this.user.updateInfo.method,
      url: this.user.updateInfo.url,
      data: updatedInfo
    })
  }

  async terminateSession(id) {
    return await this.api.request({
      method: this.user.terminateSession.method,
      url: this.user.terminateSession.url,
      params: {
        id: id
      }
    })
  }

}

export default User;