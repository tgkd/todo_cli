import * as actions from '../actions/task';
import Task from 'libs/task';

const task = new Task();

export function getTasks() {
  return async (dispatch) => {
    const response = await task.getList();
    dispatch(actions.getTasks(response.data))
  }
}

export function updateTask(taskInfo) {
  return async (dispatch) => {
    const response = await task.update(taskInfo);
    dispatch(actions.updateTask(response.data));
  }
}

export function createTask(newTask) {
  return async (dispatch) => {
    const response = await task.create(newTask);
    dispatch(actions.createTask(response.data));
  }
}

export function deleteTask(id) {
  return async (dispatch) => {
    const response = await task.del(id);
    dispatch(actions.deleteTask(response.data));
  }
}