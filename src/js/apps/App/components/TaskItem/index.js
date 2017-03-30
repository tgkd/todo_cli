import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.task.title,
      done: this.props.task.done,
      end: this.props.task.end,
      _id: this.props.task.id
    }
  }

  updateTask() {
    this.setState({
      done: true
    });
    this.props.updateTask(this.state);
  }

  deleteTask() {
    this.props.deleteTask(this.state._id);
  }

  render() {
    const { title, done, end } = this.state;
    const taskContent = done ? <p>{end}</p> : <p onClick={::this.deleteTask}>del</p>;
    return (
      <div>
        <input type="checkbox" checked={done} onChange={::this.updateTask} disabled={!done}/>
        <p>{title}</p>
        {taskContent}
      </div>

    )
  }
}