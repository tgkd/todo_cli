import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/task';

import Task from '../../components/Task';
import Navigation from '../../components/Navigation';

@connect(
  ({ taskList, user }) => ({ taskList, user }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  createTask(task) {
    const { createTask } = this.props;
    createTask(task)
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }
  updateTask(task) {
    const { updateTask } = this.props;
    updateTask(task)
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }
  deleteTask(id) {
    const { deleteTask } = this.props;
    deleteTask(id)
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }
  taskList() {
    const { taskList } = this.props;
    taskList()
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }
  render() {
    return (
      <div>
        <Navigation/>
        <div className="row center-xs center-md center-md">
          <Task
            apiError={this.state.error}
            createTask={::this.createTask}
            updateTask={::this.updateTask}
            deleteTask={::this.deleteTask}
            taskList={::this.taskList}/>
        </div>
      </div>
    )
  }
}