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
    this.state = {
      error: '',
      incompleteTasks: [],
      completedTasks: []
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

  logout() {
    const { logout } = this.props;
    logout()
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


  filterTasks(tasks) {
    let incompleteTasks, completedTasks;

    incompleteTasks = tasks.filter(item => {
      return item.done === false;
    });
    completedTasks = tasks.filter(item => {
      return item.done === true;
    });

    this.setState({
      incompleteTasks,
      completedTasks
    })
  }


  componentDidMount() {
    const { taskList } = this.props.taskList;
    if (taskList && taskList.length > 0) {
      this.filterTasks(taskList)
    }

    const { getTasks } = this.props;

    getTasks()
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }

  render() {

    const { incompleteTasks, completedTasks } = this.state;

    return (
      <div>
        <Navigation logout={::this.logout}/>
        <div className='row center-xs center-md center-md'>
          <Task
            incompleteTasks={incompleteTasks}
            completedTasks={completedTasks}
            apiError={this.state.error}
            createTask={::this.createTask}
            updateTask={::this.updateTask}
            deleteTask={::this.deleteTask}/>
        </div>
      </div>
    )
  }
}