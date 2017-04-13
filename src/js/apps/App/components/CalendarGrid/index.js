import moment from 'moment';
import React, {Component} from 'react';
import TaskCard from '../TaskCard';

export default class Weeks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      taskWindowVisible: false
    }
  }

  sortTasksByTime() {
    const { incompleteTasks } = this.props;
    incompleteTasks.sort((a, b) => {
      let first = moment(a.end)
    });

    this.setState({
      tasks: incompleteTasks
    })
  }

  componentDidMount() {
    document.getElementById('root').addEventListener('click', (e) => {
      const target = e.target.className;
      let card = target.indexOf('task-card');
      let task = target.indexOf('cell__task');
      if (card < 0 && task < 0) {
        this.setState({
          taskWindowVisible: false
        })
      }
    });

    this.setState({
      tasks: this.props.incompleteTasks
    });

    const containers = document.querySelectorAll('.calendar-container__cell');
    [].forEach.call(containers, (container) => {
      container.addEventListener('dragenter', this.dragEnter.bind(this, container), false);
      container.addEventListener('dragover', this.dragOver.bind(this, container), false);
      container.addEventListener('dragleave', this.dragLeave.bind(this, container), false);
      container.addEventListener('drop', this.handleDrop.bind(this, container), false);
    });
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

  addEventListener(item) {
    item.addEventListener('dragstart', this.dragStart.bind(this, item), false);
    item.addEventListener('dragend', this.dragEnd.bind(this, item), false);
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
    console.log(e)
  }

  dragEnd(item, event) {
    console.log(item, event)
  }

  dragLeave(container, e) {
    console.log(e)
  }

  dragOver(container, e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  handleDrop(cell, event) {
    event.stopPropagation();
    const { transferTask } = this.state;
    const oldChild = document.getElementById(transferTask.id);
    const oldCell = oldChild.parentNode.parentNode;
    if (oldCell === cell) {
      return;
    }
    const oldCellTasksList = oldChild.parentNode;
    oldCellTasksList.removeChild(oldChild);

    const newTaskDiv = document.createElement('div');
    newTaskDiv.innerHTML = transferTask.content;
    newTaskDiv.className = oldChild.className;
    newTaskDiv.draggable = true;
    newTaskDiv.id = transferTask.id;

    this.setNewTaskDate(cell.id);
    const newCellTasksList = cell.childNodes[1];
    newCellTasksList.appendChild(newTaskDiv);
    this.addEventListener(newTaskDiv);

    return false;
  }

  setNewTaskDate(id) {
    const { tasks } = this.state;
    let test = moment(id).year(2017);
    let oldTaskInfo = null;
    tasks.forEach(task => {
      if (task._id === id) {
        oldTaskInfo = task;
      }
    });

    if (oldTaskInfo) {
      const oldTaskDate = moment(oldTaskInfo.end);
      const newDate = moment(id).year(oldTaskInfo.year())

    }
  }

  toggleTaskWindow(id, e) {
    this.setState({
      taskWindowVisible: !this.state.taskWindowVisible,
      currentId: id
    })
  }

  getCalendarTemplate() {
    const { incompleteTasks, calendar, month } = this.props;
    const { taskWindowVisible, currentId } = this.state;

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

          const taskToday = incompleteTasks.map((task, id) => {
            const calendarDate = day.locale('ru').utc().format('DD-MM-YYYY');
            const taskDate = moment(task.end).locale('ru').utc().format('DD-MM-YYYY');
            if (calendarDate === taskDate) {
              let time = moment.parseZone(task.end).format('HH:mm');
              return (
                <div id={task._id} draggable={true} className='cell__task' key={id}>
                  <div>
                    <span className='cell__task-name'
                          onClick={this.toggleTaskWindow.bind(this, task._id)}>{task.title}</span>
                    <span className='cell__task-time' onClick={this.toggleTaskWindow.bind(this, task._id)}>{time}</span>
                    {
                      taskWindowVisible && currentId === task._id &&
                      <TaskCard
                        title={task.title}
                        _id={task._id}
                        updateTask={::this.updateTask}
                        date={task.end}/>
                    }
                  </div>
                </div>
              )
            }
          });

          return (
            <div id={day.format('D-MM')} className={dayClasses} key={day.format('D-MM')}>
              <p className='calendar-container__date'>{ day.format('D') }</p>
              <div className='cell__tasks-list'>
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

  render() {
    const { dayNames } = this.props;
    const dayNamesRow = dayNames.map(day => {
      return (
        <div className='dayname-container'>
          <span className='dayname-container__name'>{day}</span>
        </div>
      )
    });

    const weeks = this.getCalendarTemplate();

    return (
      <div className='col-xs-12 col-sm-12 col-md-12' style={{ padding: 0 }}>
        <div className='calendar-container__daynames'>
          {dayNamesRow}
        </div>
        {weeks}
      </div>
    )
  }
}