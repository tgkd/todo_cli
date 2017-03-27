import axios from 'axios';
import api from './config';

class Task {
  constructor() {
    this.task = api.methods.task;
    this.apiHost = api.backendUrl;
  }

  getList() {
    return axios.request({
      method: this.task.list.method,
      url: this.apiHost + this.task.list.url
    })
  }

  create(newTask) {
    return axios.request({
      method: this.task.create.method,
      url: this.apiHost + this.task.create.url,
      data: newTask
    })
  }

  update(updatedTask) {
    return axios.request({
      method: this.task.update.method,
      url: this.apiHost + this.task.update.url,
      data: updatedTask
    })
  }

  del(id) {
    return axios.request({
      method: this.task.del.method,
      url: this.apiHost + this.task.del.url,
      data: {
        id: id
      }
    })
  }

}

export default Task;