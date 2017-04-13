import React, {Component} from 'react';
import Checkbox from '../Checkbox';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  deleteTask() {
    this.props.deleteTask(this.props.task._id);
  }

  render() {
    const { task } = this.props;
    return (
      <div className="row middle-xs middle-sm middle-md tasks-container__task task task--completed">
        <div className="col-xs-1 col-sm-1 col-md-1">
          <Checkbox checked={true} disabled={true}/>
        </div>
        <div className="col-xs-9 col-sm-9 col-md-9">
          <p className="task__name">{task.title}</p>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2 icon-button" onClick={this.deleteTask.bind(this, task.id)}>
          <img src="/assets/delete.svg" alt="delete task" className="icon-button__ico"/>
          <span className="icon-button__text">Удалить</span>
        </div>
      </div>
    )
  }
}