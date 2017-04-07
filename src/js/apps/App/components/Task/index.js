import React, { Component } from 'react';
import {CompletedTask, IncompleteTask} from './../TaskItem';
import NewTask from '../NewTask';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  createTask(newTask) {
    this.props.createTask(newTask);
  }

  deleteTask(id) {
    this.props.deleteTask(id);
  }

  updateTask(updatedTask) {
    this.props.updateTask(updatedTask);
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
      <div className='tasks-container col-xs-10 col-sm-10 col-md-10'>
        <div className='row center-xs center-sm center-md'>
          <div className='col-xs-12 col-sm-12 col-md-12'>
            <h1 className='tasks-container__header'>Дела</h1>
          </div>
          <div className='col-xs-10 col-sm-10 col-md-10'>
            <NewTask apiErorr={this.props.apiError} createHandler={::this.createTask}/>
          </div>
        </div>
        <br/>
        <hr/>

        <div className='row center-xs center-sm center-md'>
          {incompleteList}
        </div>
        <hr/>
        <div className='row center-xs center-sm center-md'>
          {completedList}
        </div>

      </div>

    )
  }
}