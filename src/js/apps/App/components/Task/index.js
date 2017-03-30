import React, { Component } from 'react';
import TaskItem from './../TaskItem';

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



  render() {
    const tasks = this.props.tasks;
    let { incompleteTasks, completedTasks } = this.state;
    if(tasks) {
      incompleteTasks = tasks.filter(item => {
        return item.done === false;
      });
      completedTasks = tasks.filter(item => {
        return item.done === true;
      });
    }
    const {updateTask, deleteTask} = this.props;

    return (
      <div>
        <div>
          <input type="text" placeholder="new task"/>
          <button onClick={::this.addTask}>add</button>
        </div>

        <hr/>

        {incompleteTasks.forEach(task => {
          return(
            <TaskItem
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )
        })}

        <hr/>

        {completedTasks.forEach(task => {
          return(
            <TaskItem
              key
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )
        })}

      </div>

    )
  }
}