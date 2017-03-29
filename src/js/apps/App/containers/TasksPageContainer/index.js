import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/task';

import Task from '../../components/Task';

@connect(
  ({ user }) => ({ user }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { createTask, updateTask, deleteTask, getTasks } = this.props;
    const { tasks } = this.props.user;

    return (
      <div>
        <h4>Profile container</h4>
        <Task
          createTask={createTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          getTasks={getTasks}
          tasks={tasks}
        />
      </div>
    )
  }
}