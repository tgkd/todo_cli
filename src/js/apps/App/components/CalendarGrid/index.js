import moment from 'moment';
import React, {Component} from 'react';
import TaskCard from '../TaskCard';

export default class Weeks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transferTask: null,
      tasks: [],
      taskWindowVisible: false
    }
  }

  setEventListeners() {
    const { month } = this.props;
    const tasks = document.querySelectorAll('.cell__task');
    [].forEach.call(tasks, (task) => {
      task.addEventListener('dragstart', this.dragStart.bind(this, task), false);
      task.addEventListener('dragend', this.dragEnd.bind(this, task), false);
    });

    const containers = document.querySelectorAll('.calendar-container__cell');
    [].forEach.call(containers, (container) => {
      let dateCellMonth = moment(container.id, 'DD-MM-YYYY').month();
      if (dateCellMonth === month) {
        container.addEventListener('dragenter', this.dragEnter.bind(this, container), false);
        container.addEventListener('dragover', this.dragOver.bind(this, container), false);
        container.addEventListener('dragleave', this.dragLeave.bind(this, container), false);
        container.addEventListener('drop', this.handleDrop.bind(this, container), false);
      }
    });
  }

  componentDidMount() {
    this.setState({
      tasks: this.props.incompleteTasks
    });
    this.setEventListeners()
  }

  componentDidUpdate() {
    const { tasks } = this.state;
    const { incompleteTasks } = this.props;
    if (incompleteTasks.length !== 0 && tasks.length === 0) {
      const tasks = document.querySelectorAll('.cell__task');
      [].forEach.call(tasks, (task) => {
        task.addEventListener('dragstart', this.dragStart.bind(this, task), false);
        task.addEventListener('dragend', this.dragEnd.bind(this, task), false);
      });

    }
  }

  dragStart(item, event) {
    this.setState({
      transferTask: {
        id: item.id,
        content: item.innerHTML
      }
    });
    event.dataTransfer.effectAllowed = 'move';
  }

  dragEnter(container, e) {
    /* if (container.className.indexOf('drag-enter-cell') < 0) {
     container.className = container.className + ' drag-enter-cell'
     }*/
  }

  dragEnd(item, event) {

  }

  dragLeave(container, e) {
    /* let styleClass = container.className.split(' ');
     styleClass.pop();

     container.className = styleClass.join(' ');*/
  }

  dragOver(container, e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    /* if (container.className.indexOf('drag-enter-cell') < 0) {
     container.className = container.className + ' drag-enter-cell'
     }*/
  }

  handleDrop(cell, event) {
    event.stopPropagation();
    this.setNewTaskDate(cell.id);
    let styleClass = cell.className.split(' ');
    cell.className = styleClass[0];
    return false;
  }

  setNewTaskDate(id) {
    const { transferTask } = this.state;
    const { incompleteTasks } = this.props;

    let oldTaskInfo = null;
    incompleteTasks.forEach(task => {
      if (task._id === transferTask.id) {
        oldTaskInfo = task;
      }
    });

    if (oldTaskInfo) {
      const hours = moment.parseZone(oldTaskInfo.end).hours();
      const minutes = moment.parseZone(oldTaskInfo.end).minutes();

      const newDate = moment(id, 'DD-MM-YYYY')
          .hour(hours)
          .minute(minutes)
          .seconds(0)
          .format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z';
      this.updateTask({
        title: oldTaskInfo.title,
        _id: oldTaskInfo._id,
        end: newDate,
        done: false
      })
    }
  }

  toggleTaskWindow(id, e) {
    this.setState({
      taskWindowVisible: !this.state.taskWindowVisible,
      currentId: id
    })
  }

  getTasksTemplatesByDay(day) {
    const { incompleteTasks } = this.props;
    const { taskWindowVisible, currentId } = this.state;
    return incompleteTasks.map((task, id) => {
      const calendarDate = moment.parseZone(day).locale('ru').format('DD-MM-YYYY');
      const taskDate = moment.parseZone(task.end).locale('ru').format('DD-MM-YYYY');
      if (calendarDate === taskDate) {
        let time = moment.parseZone(task.end).format('HH:mm');
        return (
          <div id={task._id} draggable={true} className='cell__task row' key={id}>
            <div className="col-xs-12 col-md-7 col-sm-7">{/*    position absolute*/}
              <p className='cell__task-name' onClick={this.toggleTaskWindow.bind(this, task._id)}>{task.title}</p>
            </div>
            <div className="col-xs-12 col-md-5 col-sm-5">
              <p className='cell__task-time' onClick={this.toggleTaskWindow.bind(this, task._id)}>{time}</p>
            </div>
            {
              taskWindowVisible && currentId === task._id &&
              <TaskCard
                title={task.title}
                _id={task._id}
                updateTask={::this.updateTask}
                date={task.end}/>
            }
          </div>
        )
      }
    });
  }

  getCalendarTemplate() {
    const { calendar, month } = this.props;

    let weeks = [];
    if (calendar) {
      weeks = calendar.map((week, id) => {
        let dayList = [];

        for (let day of week.by('days')) {
          dayList.push(day)
        }

        let days = dayList.map((day) => {
          let dayClasses = 'calendar-container__cell';
          if (!(day.month() === month)) {
            dayClasses += ' calendar-container__cell--muted';
          }
          const taskToday = this.getTasksTemplatesByDay(day);

          return (
            <div id={day.format('DD-MM-YYYY')} className={dayClasses} key={day.format('DD-MM-YYYY')}>
              <p className='calendar-container__date'>{ day.format('D') }</p>
              <div className="cell__tasks-list">
                {taskToday}
              </div>
            </div>
          )
        });

        return (
          <div className='calendar-container__row' key={ id }>
            { days }
          </div>
        )
      });
    }

    return weeks;
  }

  updateTask(task) {
    this.props.updateTask(task);
    this.toggleTaskWindow()
  }


  render() {
    const { dayNames } = this.props;
    const dayNamesRow = dayNames.map(day => {
      return (
        <div className='dayname-container'>
          <span className='dayname-container__name'>{day}</span>
        </div>
      )
    });

    return (
      <div className='col-xs-12 col-sm-12 col-md-12' style={{ padding: 0 }}>
        <div className='calendar-container__daynames'>
          {dayNamesRow}
        </div>
        {this.getCalendarTemplate()}
      </div>
    )
  }
}