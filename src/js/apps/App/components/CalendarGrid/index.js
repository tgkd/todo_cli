import moment from 'moment';
import React, {Component} from 'react';
import CalendarTaskItem from '../CalendarTaskItem';
import * as ReactDOM from "react-dom";

export default class Weeks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transferTask: null,
      tasks: [],
      taskWindowVisible: false,
      moreTasksVisible: false,
      dayToShowMoreTasks: null
    };

    this.classNames = {
      extendedList: 'cell__tasks-list--extended',
      invisibleBtn: 'more-tasks-container--invisible',
      noOverflow: 'no-overflow',
      dragEnter: 'drag-enter-cell',
      dragOver: 'drag-over-cell'
    }
  }

  setEventListeners() {
    const { month } = this.props;

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
    this.setEventListeners();
  }

  componentDidUpdate() {
    const { tasks } = this.state;
    const { incompleteTasks } = this.props;
    if (incompleteTasks.length !== 0 && tasks.length === 0) {
      this.setState({
        tasks: incompleteTasks
      });
    }
  }

  componentWillUnmount() {
    const tasks = document.querySelectorAll('.cell__task');
    [].forEach.call(tasks, (task) => {
      task.removeEventListener('dragstart', this.dragStart.bind(this, task), false);
      task.removeEventListener('dragend', this.dragEnd.bind(this, task), false);
    });
    const containers = document.querySelectorAll('.calendar-container__cell');
    [].forEach.call(containers, (container) => {
      container.removeEventListener('dragenter', this.dragEnter.bind(this, container), false);
      container.removeEventListener('dragover', this.dragOver.bind(this, container), false);
      container.removeEventListener('dragleave', this.dragLeave.bind(this, container), false);
      container.removeEventListener('drop', this.handleDrop.bind(this, container), false);
    });
  }

  dragStart(task, event) {
    this.setState({
      transferTask: {
        id: task._id
      }
    });
    event.dataTransfer.effectAllowed = 'move';
  }

  dragEnter(container, e) {
  }

  dragEnd(item, event) {
  }

  dragLeave(container, e) {
    const { moreTasksVisible, dayToShowMoreTasks } = this.state;
    const date = moment(container.id, 'DD-MM-YYYY');
    const stateDate = moment(dayToShowMoreTasks).format('DD-MM-YYYY');
    if (moreTasksVisible && stateDate === date.format('DD-MM-YYYY')) {
      this.toggleMoreTasks(date);
    }
  }

  dragOver(container, e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  handleDrop(cell, event) {
    event.stopPropagation();
    this.setNewTaskDate(cell.id, null);
    return false;
  }

  setStyleClass(items, type) {
    items.forEach(obj => {
      obj.item.classList[type](this.classNames[obj.style])
    })
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

  toggleTaskWindow(id, day) {
    const list = document.getElementById(`list--${day.format('DD')}`);
    const btnHide = document.getElementById(`btn-hide--${day.format('DD')}`);
    const btnMore = document.getElementById(`btn-show--${day.format('DD')}`);
    const isNoOverflow = list.className.indexOf(this.classNames.noOverflow) < 0;
    if (btnHide) {
      isNoOverflow
        ? this.setStyleClass([{ item: list, style: 'noOverflow' }, { item: btnHide, style: 'invisibleBtn' }], 'add')
        : this.setStyleClass([{ item: list, style: 'noOverflow' }, { item: btnHide, style: 'invisibleBtn' }], 'remove');
    } else {
      isNoOverflow
        ? this.setStyleClass([{ item: list, style: 'noOverflow' }, { item: btnMore, style: 'invisibleBtn' }], 'add')
        : this.setStyleClass([{ item: list, style: 'noOverflow' }, { item: btnMore, style: 'invisibleBtn' }], 'remove');
    }
    this.setState({
      taskWindowVisible: !this.state.taskWindowVisible,
      currentId: id,
      moreTasksWindowVisible: false,
    })
  }

  toggleMoreTasks(day) {
    const list = document.getElementById(`list--${day.format('DD')}`);
    const btn = document.getElementById(`btn-show--${day.format('DD')}`);
    this.setState({
      dayToShowMoreTasks: day,
      moreTasksVisible: !this.state.moreTasksVisible
    });

    if (list.className.indexOf(this.classNames.extendedList) < 0) {
      this.setStyleClass([{ item: list, style: 'extendedList' }, { item: btn, style: 'invisibleBtn' }], 'add');
    } else {
      list.scrollTop = 0;
      this.setStyleClass([{ item: list, style: 'extendedList' }, { item: btn, style: 'invisibleBtn' }], 'remove');
    }
  }

  sortTasksByDate(tasks) {
    return tasks.sort(function (left, right) {
      return moment.parseZone(left.end).diff(moment.parseZone(right.end), 'hours')
    });
  }

  getTasksForToday(day, sortedTasks) {
    const calendarDate = moment.parseZone(day).format('DD-MM-YYYY');
    let tasksToday = [];
    sortedTasks.forEach((task) => {
      const taskDate = moment.parseZone(task.end).format('DD-MM-YYYY');
      if (calendarDate === taskDate) {
        tasksToday.push(task);
      }
    });
    return tasksToday;
  }


  getTasksTemplatesByDay(tasksToday, day) {
    const { taskWindowVisible, currentId } = this.state;
    return tasksToday.map((task) => {
      return <CalendarTaskItem
        dragStart={this.dragStart.bind(this, task)}
        dragEnd={this.dragEnd.bind(this, task)}
        updateTask={ ::this.updateTask }
        toggleTaskWindow={ ::this.toggleTaskWindow }
        task={ task }
        day={day}
        taskWindowVisible={ taskWindowVisible }
        currentId={ currentId }/>
    });
  }

  getHideBtnTemplate(day) {
    return <div id={`btn-hide--${day.format('DD')}`} className='btn-more'
                onClick={this.toggleMoreTasks.bind(this, day)}>
      <span className='btn-more__text'>Скрыть</span>
      <span className='btn-more__icon fa fa-arrow-up'/>
    </div>
  }

  scrollList(day) {
    const currentList = document.getElementById(`list--${day.format('DD')}`);
    const scroll = document.getElementById(`scroll--${day.format('DD')}`);
    const position = scroll.style.bottom === '' ? -10 : parseInt(scroll.style.bottom) - 10;
    if (currentList.clientHeight > currentList.scrollTop) {
      scroll.style.bottom = `${position}px`;
      currentList.scrollTop += 10;
    }
  }

  getScrollTemplate(day) {
    return (
      <div className="scroll" id={`scroll--${day.format('DD')}`}>
        <div onClick={this.scrollList.bind(this, day)}>
          <span className="fa fa-arrow-down"/>
        </div>
      </div>
    )
  }

  getMoreBtn(day) {
    return (
      <div className='btn-more' onClick={this.toggleMoreTasks.bind(this, day)}>
        <span className='btn-more__text'>Еще задачи</span>
        <span className='btn-more__icon fa fa-arrow-down'/>
      </div>
    )
  }

  getCalendarTemplate() {
    const { tasks, moreTasksVisible, dayToShowMoreTasks } = this.state;
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
          const sortedTasks = this.sortTasksByDate(tasks);
          const tasksToday = this.getTasksForToday(day, sortedTasks);
          const tasksTemplatesForToday = tasksToday.length > 0 ? this.getTasksTemplatesByDay(tasksToday, day) : null;


          return (
            <div id={day.format('DD-MM-YYYY')} className={dayClasses} key={day.format('DD-MM-YYYY')}>
              <p className='calendar-container__date'>
                { day.format('D') }
              </p>
              <p className='calendar-container__date--extended'>
                { day.locale('ru').format('dd').toString().toUpperCase()}
              </p>
              <div className="cell__tasks-list" id={`list--${day.format('DD')}`}>
                {tasksTemplatesForToday}
                {
                  moreTasksVisible && day.format('DD-MM') === dayToShowMoreTasks.format('DD-MM') &&
                  tasksTemplatesForToday && tasksTemplatesForToday.length > 2
                    ? this.getHideBtnTemplate(day)
                    : null
                }
                {
                  moreTasksVisible && day.format('DD-MM') === dayToShowMoreTasks.format('DD-MM') &&
                  tasksTemplatesForToday && tasksTemplatesForToday.length > 2
                    ? this.getScrollTemplate(day)
                    : null
                }
              </div>
              <div className="more-tasks-container" id={`btn-show--${day.format('DD')}`}>
                {
                  tasksTemplatesForToday && tasksTemplatesForToday.length > 2
                    ? this.getMoreBtn(day)
                    : null
                }
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

  updateTask(task, day) {
    this.props.updateTask(task);
    this.toggleTaskWindow(task._id, day || null)
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