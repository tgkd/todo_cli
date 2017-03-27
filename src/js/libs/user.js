import axios from 'axios';
import api from './config';

class User {
  constructor() {
    this.user = api.methods.user;
    this.apiHost = api.backendUrl;
  }

  get() {
    return axios.request({
      method: this.user.getInfo.method,
      url: this.apiHost + this.user.getInfo.url
    })
  }

  update(updatedInfo) {
    return axios.request({
      method: this.user.updateInfo.method,
      url: this.apiHost + this.user.updateInfo.url,
      data: updatedInfo
    })
  }

  terminateSession(id) {
    return axios.request({
      method: this.user.terminateSession.method,
      url: this.apiHost + this.user.terminateSession.url,
      params: {
        id: id
      }
    })
  }

}

export default User;