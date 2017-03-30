import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/task';

import Task from '../../components/Task';

@connect(
  ({ taskList, user }) => ({ taskList, user }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { taskList, createTask, updateTask, deleteTask} = this.props;

    return (
      <div>
        <h4>Profile container</h4>
        <Task
          createTask={createTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          tasks={taskList}
        />
      </div>
    )
  }
}