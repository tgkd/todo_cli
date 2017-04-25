import moment from 'moment';
import React, {Component} from 'react';
import TaskCard from '../TaskCard';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  toggleTaskWindow(id, day) {
    const { toggleTaskWindow } = this.props;
    toggleTaskWindow(id, day);
  }

  updateTask(task, day) {
    const { updateTask } = this.props;
    updateTask(task, day);
  }


  render() {
    const {
      taskWindowVisible,
      currentId,
      task,
      dragStart,
      dragEnd,
      day,
      list
    } = this.props;

    const time = moment.parseZone(task.end).format('HH:mm');

    return (
      <div
        id={task._id}
        draggable={true}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        className='cell__task'
        key={task._id}
        onClick={this.toggleTaskWindow.bind(this, task._id, day)}>

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