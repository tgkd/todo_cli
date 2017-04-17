import React, {Component} from 'react';
import CalendarTaskItem from '../CalendarTaskItem';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  getTasksListTemplate(){
    const {
      tasks,
      updateTask,
      toggleTaskWindow,
      taskWindowVisible,
      currentId
    } = this.props;

    return tasks.map(task => {
      return (
        <CalendarTaskItem
          updateTask={updateTask}
          toggleTaskWindow={ toggleTaskWindow }
          task={task}
          taskWindowVisible={taskWindowVisible}
          currentId={currentId}/>
      )
    })
  }

  render() {

    return (
      <div className="cell__tasks-list">
        {::this.getTasksListTemplate()}
      </div>
    )
  }
}