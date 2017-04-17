import React, { Component } from 'react';
import {CompletedTask, IncompleteTask} from './../TaskItem';
import NewTask from '../NewTask';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
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


  componentDidMount() {
    const { getTasks } = this.props;
    getTasks()
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }

  render() {

    const { incompleteTasks, completedTasks } = this.props;

    const incompleteList = incompleteTasks.map(item => {
      return (
        <div className='col-xs-10 col-sm-10 col-md-10' key={item._id}>
          <IncompleteTask task={item}
                          updateTask={::this.updateTask}/>
        </div>
      )
    });
    const completedList = completedTasks.map(item => {
      return (
        <div className='col-xs-10 col-sm-10 col-md-10' key={item._id}>
          <CompletedTask task={item}
                         deleteTask={::this.deleteTask}/>
        </div>
      )
    });

    return (
      <div className='tasks-container col-xs-10 col-sm-10 col-md-10 col-lg-7'>
        <div className='row center-xs center-sm center-md'>
          <div className='col-xs-12 col-sm-12 col-md-12'>
            <h1 className='tasks-container__header'>Дела</h1>
          </div>
          <div className='col-xs-10 col-sm-10 col-md-10'>
            <NewTask createHandler={::this.createTask}/>
          </div>
        </div>
        <br/>
        <hr/>
        <div className='row center-xs center-sm center-md tasks-container__incomplete-list'>
          {incompleteList.length === 0 ? 'Нет незавершенных задач' : incompleteList}
        </div>
        <hr/>
        <div className='row center-xs center-sm center-md tasks-container__completed-list'>
          {completedList.length === 0 ? 'Нет завершенных задач' : completedList}
        </div>
      </div>

    )
  }
}