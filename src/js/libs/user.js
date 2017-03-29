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
/*todo get by ...?*/
  get() {
    return this.api.request({
      method: this.user.getInfo.method,
      url: this.user.getInfo.url
    })
  }

  update(updatedInfo) {
    return this.api.request({
      method: this.user.updateInfo.method,
      url: this.user.updateInfo.url,
      data: updatedInfo
    })
  }

  terminateSession(id) {
    return this.api.request({
      method: this.user.terminateSession.method,
      url: this.user.terminateSession.url,
      params: {
        id: id
      }
    })
  }

}

export default User;