import * as actions from '../constants/task';

export default function (state = {}, action) {
  switch (action.type) {
    case actions.getTasks:
      return { taskList: action.payload };
    case actions.createTask:
      return { taskList: [...state.taskList, action.payload] };
    case actions.updateTask:
      let updatedList = state.taskList.map(task => {
        if(task._id === action.payload._id) {
          task.done = true;
        }
      });
      return { taskList: updatedList };
    case actions.deleteTask:
      return { taskList: action.payload };
    default:
      return state
  }
}