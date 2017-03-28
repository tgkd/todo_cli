import * as actions from '../constants/task';

export function getTasks(tasks) {
  return {
    type: actions.getTasks,
    payload: tasks
  }
}

export function createTask(task) {
  return {
    type: actions.createTask,
    payload: task
  }
}

export function updateTask(task) {
  return {
    type: actions.updateTask,
    payload: task
  }
}

export function deleteTask(task) {
  return {
    type: actions.deleteTask,
    payload: task
  }
}

export function error(error) {
  return {
    type: actions.error,
    payload: error
  }
}
