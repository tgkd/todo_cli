import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      done: '',
      end: '',
      _id: ''
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.task.title,
      done: this.props.task.done,
      end: this.props.task.end,
      _id: this.props.task.id
    });
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
    const { task } = this.props;
    return (

      <div className="row middle-xs middle-sm middle-md tasks-container__task task task--completed">
        <div className="col-xs-1 col-sm-1 col-md-1">
          <input type="checkbox" checked={false} onChange={::this.updateTask} />
        </div>
        <div className="col-xs-9 col-sm-9 col-md-9">
          <p className="task-name">{task.title}</p>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2">
          <span>{task.end}</span>
        </div>
      </div>

    )
  }
}