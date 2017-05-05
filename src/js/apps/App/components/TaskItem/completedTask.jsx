import React, {Component} from 'react';
import Checkbox from '../Checkbox';
import Loader from 'components/Loader';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledTask: false
    };
  }

  updateTask() {
    this.setState({
      disabledTask: true
    }, () => {
      this.props.updateTask({
        ...this.props.task,
        done: false
      });
    });
  }

  deleteTask() {
    this.setState({
      disabledTask: true
    }, () => {
      this.props.deleteTask(this.props.task._id);
    });
  }

  getDisabledTemplate() {
    return (
      <div className="task--disabled">
        <Loader size='20'/>
      </div>
    );
  }

  render() {
    const { task } = this.props;
    const { disabledTask } = this.state;
    return (
      <div className={`row middle-xs tasks-container__task task task--completed`}>
        { disabledTask ? this.getDisabledTemplate() : null}
        <div className="col-xs-1">
          <Checkbox checked={true} disabled={false} changeState={::this.updateTask}/>
        </div>
        <div className="col-xs-6 col-sm-8 col-md-9">
          <p className="task__name">{task.title}</p>
        </div>
        <div className="col-xs-5 col-sm-3 col-md-2 icon-button" onClick={this.deleteTask.bind(this, task.id)}>
          <img src="/assets/images/icons/delete.svg" alt="delete task" className="icon-button__ico"/>
          <span className="icon-button__text">Удалить</span>
        </div>
      </div>
    );
  }
}