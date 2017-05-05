import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/task';
import * as userActions from '../../store/actionCreators/user';

import Task from '../../components/Task';
import Navigation from '../../components/Navigation';

@connect(
  ({ taskList, user }) => ({ taskList, user }),
  (dispatch) => bindActionCreators({ ...actions, ...userActions }, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
  }


  filterTasks(tasks) {
    let incompleteTasks, completedTasks;

    incompleteTasks = tasks.filter(item => {
      return item.done === false;
    });
    completedTasks = tasks.filter(item => {
      return item.done === true;
    });
    return {
      incompleteTasks,
      completedTasks
    };
  }


  render() {
    const { taskList } = this.props.taskList;
    const { getTasks, createTask, updateTask, deleteTask, logout } = this.props;
    const { incompleteTasks, completedTasks } = this.filterTasks(taskList || []);
    return (
      <div className="pagecontent">
        <Navigation logout={logout}/>
        <div className='row center-xs'>
          <Task
            getTasks={getTasks}
            incompleteTasks={incompleteTasks}
            completedTasks={completedTasks}
            createTask={createTask}
            updateTask={updateTask}
            deleteTask={deleteTask}/>
        </div>
      </div>
    );
  }
}