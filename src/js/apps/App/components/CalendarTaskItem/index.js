import moment from 'moment';
import React, {Component} from 'react';
import TaskCard from '../TaskCard'

export default class extends Component {
  constructor(props) {
    super(props);
  }

  toggleTaskWindow(id) {
    const { toggleTaskWindow } = this.props;
    toggleTaskWindow(id);
  }

  getClassName() {
    const { visible } = this.props;
    return `cell__task ${visible ? '' : 'cell__task--invisible'}`
  }

  render() {
    const { taskWindowVisible, currentId, task, updateTask } = this.props;
    const time = moment.parseZone(task.end).format('HH:mm');

    return (
      <div
        id={task._id}
        draggable={true}
        onClick={this.toggleTaskWindow.bind(this, task._id)}
        className={::this.getClassName()}
        key={task._id}>

        <div className='cell__task-name'>{task.title}</div>
        <div className='cell__task-time'>{time}</div>
        {
          taskWindowVisible && currentId === task._id
            ? <TaskCard
            title={task.title}
            _id={task._id}
            updateTask={updateTask}
            date={task.end}/>
            : null
        }
      </div>
    )
  }
}