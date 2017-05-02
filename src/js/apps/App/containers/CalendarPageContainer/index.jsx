import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/task';
import * as userActions from '../../store/actionCreators/user';

import CalendarPage from '../../components/CalendarPage';
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

    const { incompleteTasks, completedTasks } = this.filterTasks(taskList || []);
    const { updateTask, getTasks, logout } = this.props;

    return (
      <div>
        <Navigation logout={logout}/>
        <div className='row center-xs center-sm center-md'>
          <CalendarPage
            incompleteTasks={incompleteTasks}
            completedTasks={completedTasks}
            updateTask={updateTask}
            getTasks={getTasks}
          />
        </div>
      </div>
    );
  }
}