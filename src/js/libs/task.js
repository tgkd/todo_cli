import axios from 'axios';
import api from './config';

class Task {
  constructor() {
    this.task = api.methods.task;
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

  async getList() {
    return await this.api.request({
      method: this.task.list.method,
      url: this.task.list.url
    });
  }

  async create(newTask) {
    return await this.api.request({
      method: this.task.create.method,
      url: this.task.create.url,
      data: newTask
    });
  }

  async update(updatedTask) {
    return await this.api.request({
      method: this.task.update.method,
      url: this.task.update.url,
      data: updatedTask
    });
  }

  async del(id) {
    return await this.api.request({
      method: this.task.del.method,
      url: this.task.del.url,
      data: {
        id: id
      }
    });
  }

}

export default Task;