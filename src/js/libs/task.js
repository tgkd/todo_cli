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

  getList() {
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.task.list.method,
        url: this.task.list.url
      })
        .then(task => {
          resolve(task)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  create(newTask) {
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.task.create.method,
        url: this.task.create.url,
        data: newTask
      })
        .then(task => {
          resolve(task)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  update(updatedTask) {
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.task.update.method,
        url: this.task.update.url,
        data: updatedTask
      })
        .then(task => {
          resolve(task)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  del(id) {
    return new Promise((resolve, reject) => {
      return this.api.request({
        method: this.task.del.method,
        url: this.task.del.url,
        data: {
          id: id
        }
      })
        .then(task => {
          resolve(task)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default Task;