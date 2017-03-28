import * as actions from '../actions/task';
import Task from '../../../../libs/task';

const task = new Task();

export function getTasks() {
  return (dispatch) => {
    return task
      .getList()
      .then(response => {
        dispatch(actions.getTasks(response.data));
      })
      .catch(error => {
        dispatch(actions.error(error));
      })
  }
}

export function updateTask(taskInfo) {
  return (dispatch) => {
    return task
      .update(taskInfo)
      .then(response => {
        dispatch(actions.updateTask(response.data));
      })
      .catch(error => {
        dispatch(actions.error(error));
      })
  }
}

export function createTask(newTask) {
  return (dispatch) => {
    return task
      .create(newTask)
      .then(response => {
        dispatch(actions.createTask(response.data));
      })
      .catch(error => {
        dispatch(actions.error(error));
      })
  }
}

export function deleteTask(id) {
  return (dispatch) => {
    return task
      .del(id)
      .then(response => {
        dispatch(actions.deleteTask(response.data));
      })
      .catch(error => {
        dispatch(actions.error(error));
      })
  }
}