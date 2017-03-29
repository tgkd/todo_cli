import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: {
        title: '',
        done: false,
        end: ''
      },
      tasks: this.props.tasks,
      incompleteTasks: [],
      completedTasks: []
    }
  }

  addTask() {
    this.props.createTask(this.props.newTask);
  }

  /*get All tasks?*/
  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const tasks = this.props.tasks;
    /*sort tasks array*/

    let incompleteTasks = [];
    let completedTasks = [];
    if(tasks) {
      incompleteTasks = tasks.filter(item => {
        return item.done === false;
      });
      completedTasks = tasks.filter(item => {
        return item.done === true;
      });
    }


    return (
      <div>
        <div>
          <input type="text" placeholder="new task"/>
          <button onClick={::this.addTask}>add</button>
        </div>
        <ul>
          {incompleteTasks.forEach(task => {
            return(
              <li>{task.title}</li>
            )
          })}
        </ul>

        <hr/>
        <ul>
          {completedTasks.forEach(task => {
            return(
              <li>{task.title}</li>
            )
          })}
        </ul>
      </div>

    )
  }
}