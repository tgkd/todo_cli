import moment from 'moment';
import React, {Component} from 'react';
import TaskCard from '../TaskCard';
import Loader from 'components/Loader';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  toggleTaskWindow(id, day, e) {
    const { toggleTaskWindow } = this.props;
    toggleTaskWindow(id, day, e);
  }

  updateTask(task, day) {
    const { updateTask } = this.props;
    updateTask(task, day);
  }

  getDisabledTemplate() {
    const { task, transferTask } = this.props;
    if (task._id === transferTask) {
      return <div className="task--disabled">
        <Loader/>
      </div>;
    }
  }

  render() {
    const {
      taskWindowVisible,
      currentId,
      task,
      dragStart,
      day,
      list,
      disabledTask
    } = this.props;

    const time = moment.parseZone(task.end).format('HH:mm');

    return (
      <div
        id={task._id}
        draggable={true}
        onDragStart={dragStart}
        className='cell__task'
        key={task._id}
        onClick={this.toggleTaskWindow.bind(this, task._id, day)}>
        {
          disabledTask
            ? this.getDisabledTemplate()
            : null
        }
        <div className='cell__task-name'>{task.title}</div>
        <div className='cell__task-time'>{time}</div>
        {
          taskWindowVisible && currentId === task._id
            ? <TaskCard
            toggleWindow={::this.toggleTaskWindow}
            list={list}
            title={task.title}
            _id={task._id}
            updateTask={::this.updateTask}
            date={task.end}
            day={day}/>
            : null
        }
      </div>
    );
  }
}