import React, { Component } from 'react';
import {CompletedTask, IncompleteTask} from './../TaskItem';
import NewTask from '../NewTask';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: {
        title: '',
        done: false,
        end: ''
      },
      incompleteTasks: [],
      completedTasks: []
    }
  }

  createTask() {

    this.props.createTask(this.props.newTask);
  }



  render() {
    const tasks = this.props.tasks;
    let { incompleteTasks, completedTasks } = this.state;
    if(tasks && tasks.length > 0) {
      incompleteTasks = tasks.filter(item => {
        return item.done === false;
      });
      completedTasks = tasks.filter(item => {
        return item.done === true;
      });
    }

    /*update component state after filter state*/
    const {updateTask, deleteTask} = this.props;

    const incompleteList = incompleteTasks.map(item => {
      return (
        <div className="col-xs-8 col-sm-8 col-md-8" key={item._id}>
          <IncompleteTask task={item}
                    deleteTask={deleteTask}/>
        </div>
      )
    });
    const completedList = completedTasks.map(item => {
      return (
        <div className="col-xs-8 col-sm-8 col-md-8" key={item._id}>
          <CompletedTask task={item}
                    updateTask={updateTask}/>
        </div>
      )
    });

    return (
      <div className="tasks-container col-xs-10 col-sm-10 col-md-10">
        <div className="row center-xs center-sm center-md">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <h1 className="tasks-container__header">Дела</h1>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12">
            <NewTask createHandler={::this.createTask}/>
          </div>
        </div>
        <hr/>

        <div className="row center-xs center-sm center-md">
          {incompleteList}
          <hr/>
          {completedList}
        </div>

      </div>

    )
  }
}