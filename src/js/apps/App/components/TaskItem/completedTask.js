import React, { Component } from 'react';
import Checkbox from '../Checkbox';

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
    const { task } = this.props;
    this.setState({
      title: task.title,
      done: task.done,
      end: task.end,
      _id: task._id
    });
  }

  deleteTask() {
    this.props.deleteTask(this.state._id);
  }

  render() {
    const { task } = this.props;
    return (
      <div className="row middle-xs middle-sm middle-md tasks-container__task">
        <div className="col-xs-10 col-sm-10 col-md-10">
          <div className="row middle-xs middle-sm middle-md task task--completed">
            <div className="col-xs-1 col-sm-1 col-md-1">
              <Checkbox checked={true} disabled={true}/>
              {/*<input type="checkbox" checked={true} disabled={true}/>*/}
            </div>
            <div className="col-xs-11 col-sm-11 col-md-11">
              <p className="task__name">{task.title}</p>
            </div>
          </div>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2 session-button" onClick={this.deleteTask.bind(this, task.id)}>
          <img src="/assets/delete.svg" alt="delete task"/>
          <span>&nbsp;Удалить</span>
        </div>
      </div>
    )
  }
}