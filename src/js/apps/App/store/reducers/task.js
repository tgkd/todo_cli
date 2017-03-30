import * as actions from '../constants/task';

export default function (state = {}, action) {
  switch (action.type) {
    case actions.getTasks:
      return {ac};
    case actions.createTask:
      return { };
    case actions.updateTask:
      return { };
    case actions.deleteTask:
      return { };
    case actions.error:
      return { };
    default:
      return state
  }
}