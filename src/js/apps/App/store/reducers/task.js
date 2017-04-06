import * as actions from '../constants/task';

export default function (state = {}, action) {
  switch (action.type) {
    case actions.getTasks:
      return { taskList: action.payload };
    case actions.createTask:
      return { taskList: [...state.taskList, action.payload] };
    case actions.updateTask:
      return { /*todo find by id and update?*/ };
    case actions.deleteTask:
      return { };
    default:
      return state
  }
}