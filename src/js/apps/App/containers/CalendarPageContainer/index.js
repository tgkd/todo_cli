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
    this.state = {
      error: '',
      incompleteTasks: [],
      completedTasks: []
    };
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
      .then(response => {
        window.location.href = '/';
      })
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
    const { getTasks } = this.props;
    getTasks()
      .then(data => {
        const {taskList} = this.props.taskList;
        if(taskList && taskList.length > 0){
          this.filterTasks(taskList);
        }
      })
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
          <CalendarPage
            incompleteTasks={incompleteTasks}
            completedTasks={completedTasks}
            apiError={this.state.error}
            updateTask={::this.updateTask}/>
        </div>
      </div>
    )
  }
}