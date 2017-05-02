import moment from 'moment';
import React, {Component} from 'react';
import CalendarTaskItem from '../CalendarTaskItem';
import * as ReactDOM from "react-dom";
import {sortTasks} from 'libs/dateCreator';

export default class Weeks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transferTask: null,
      taskWindowVisible: false,
      moreTasksVisible: false,
      dayToShowMoreTasks: null,
      currentId: null
    };

    this.classNames = {
      extendedList: 'cell__tasks-list--extended',
      invisible: 'more-tasks-container--invisible',
      staticList: 'static-list',
      dragOver: 'drag-over-cell',
      activeTask: 'cell__task--active',
      zIndex: 'cell--zIndex'
    };

    this.taskBoxHeight = 28;
  }

  actionWithEventListeners(action = true) {
    const actionName = action ? 'addEventListener' : 'removeEventListener';
    const { month } = this.props;
    const containers = document.querySelectorAll('.calendar-container__cell');
    [].forEach.call(containers, (container) => {
      let dateCellMonth = moment(container.id, 'DD-MM-YYYY').month();
      if (dateCellMonth === month) {
        container[actionName]('dragover', this.dragOver.bind(this, container), false);
        container[actionName]('dragleave', this.dragLeave.bind(this, container), false);
        container[actionName]('drop', this.handleDrop.bind(this, container), false);
      }
    });
  }

  componentDidMount() {
    this.actionWithEventListeners();
  }

  componentWillUnmount() {
    this.actionWithEventListeners(false);
  }

  dragStart(task, event) {
    this.setState({
      transferTask: {
        id: task._id
      }
    });
    event.dataTransfer.effectAllowed = 'move';
  }

  dragEnd() {
    this.setState({
      transferTask: {
        id: null
      }
    });
  }

  dragLeave(currentTarget) {
    const { moreTasksVisible, dayToShowMoreTasks } = this.state;
    currentTarget.classList.remove('drag-over-cell');
    currentTarget.childNodes[2].classList.remove('drag-over-cell');
    if (moreTasksVisible) {
      this.toggleMoreTasks(dayToShowMoreTasks);
    }
  }

  dragOver(currentTarget, e) {
    const { moreTasksVisible, dayToShowMoreTasks } = this.state;
    e.preventDefault();
    currentTarget.classList.add('drag-over-cell');
    currentTarget.childNodes[2].classList.add('drag-over-cell');
    if (moreTasksVisible) {
      this.toggleMoreTasks(dayToShowMoreTasks);
    }
    return false;
  }

  handleDrop(currentTarget, e) {
    currentTarget.classList.remove('drag-over-cell');
    currentTarget.childNodes[2].classList.remove('drag-over-cell');
    e.stopPropagation();
    this.setNewTaskDate(currentTarget.id, null);
    return false;
  }

  setStyleClass(items, type) {
    items.forEach(obj => {
      obj.item.classList[type](this.classNames[obj.style]);
    });
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
      });
    }
  }

  toggleTaskWindow(id, day) {
    if (day) {
      const list = ReactDOM.findDOMNode(this.refs[`list-${day.format('DD')}`]);
      const btnHide = ReactDOM.findDOMNode(this.refs[`btn-hide-${day.format('DD')}`]);
      const btnMore = ReactDOM.findDOMNode(this.refs[`btn-show-${day.format('DD')}`]);
      const isStaticList = list.className.indexOf(this.classNames.staticList) < 0;
      const taskItem = document.getElementById(id);
      const cell = document.getElementById(day.format('DD-MM-YYYY'));
      const { currentId, taskWindowDay, moreTasksVisible, dayToShowMoreTasks } = this.state;

      if (moreTasksVisible && dayToShowMoreTasks.format('DD-MM-YYYY') !== day.format('DD-MM-YYYY')) {
        this.toggleMoreTasks(dayToShowMoreTasks);
      }

      if (currentId && id !== currentId) {
        this.toggleTaskWindow(currentId, taskWindowDay);
        return;
      }

      this.setState({
        taskWindowVisible: !this.state.taskWindowVisible,
        currentId: id !== currentId ? id : null,
        taskWindowDay: day !== taskWindowDay ? day : null
      }, () => {
        const { taskWindowVisible, currentId, moreTasksVisible, dayToShowMoreTasks } = this.state;
        if (taskWindowVisible) {
          const taskCard = document.getElementById(`card-${currentId}`);
          const list = dayToShowMoreTasks && ReactDOM.findDOMNode(this.refs[`list-${dayToShowMoreTasks.format('DD')}`]);
          const listVisible = !moreTasksVisible;
          const isListStart = list && list.scrollTop === 0;
          const offsetTop = taskItem.offsetTop + this.taskBoxHeight;

          taskCard.style.top = listVisible || isListStart
            ? offsetTop + 'px'
            : !listVisible || !isListStart
              ? offsetTop - this.taskBoxHeight + 'px'
              : -offsetTop + 'px';
          taskCard.scrollIntoView();
        }
      });

      if (btnHide) {
        isStaticList
          ? this.setStyleClass([{ item: cell, style: 'zIndex' }, { item: list, style: 'staticList' }, {
          item: taskItem,
          style: 'activeTask'
        }], 'add')
          : this.setStyleClass([{ item: cell, style: 'zIndex' }, { item: list, style: 'staticList' }, {
          item: taskItem,
          style: 'activeTask'
        }], 'remove');
      } else {
        isStaticList
          ? this.setStyleClass([{ item: list, style: 'staticList' }, { item: btnMore, style: 'invisible' },
          { item: taskItem, style: 'activeTask' }], 'add')
          : this.setStyleClass([{ item: list, style: 'staticList' }, { item: btnMore, style: 'invisible' },
          { item: taskItem, style: 'activeTask' }], 'remove');
      }
    }
  }

  toggleMoreTasks(day) {
    const list = ReactDOM.findDOMNode(this.refs[`list-${day.format('DD')}`]);
    const btn = ReactDOM.findDOMNode(this.refs[`btn-show-${day.format('DD')}`]);
    const { dayToShowMoreTasks } = this.state;

    if (dayToShowMoreTasks && dayToShowMoreTasks !== day) {
      this.toggleMoreTasks(dayToShowMoreTasks);
      return;
    }

    this.setState({
      dayToShowMoreTasks: day !== dayToShowMoreTasks ? day : null,
      moreTasksVisible: !this.state.moreTasksVisible
    });

    if (list.className.indexOf(this.classNames.extendedList) < 0) {
      this.setStyleClass([{ item: list, style: 'extendedList' }, { item: btn, style: 'invisible' }], 'add');
    } else {
      list.scrollTop = 0;
      this.setStyleClass([{ item: list, style: 'extendedList' }, { item: btn, style: 'invisible' }], 'remove');
    }
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
    return tasksToday.map((task, id) => {
      return <CalendarTaskItem
        key={id}
        dragStart={this.dragStart.bind(this, task)}
        dragEnd={this.dragEnd.bind(this, task)}
        updateTask={ ::this.updateTask }
        toggleTaskWindow={ ::this.toggleTaskWindow }
        task={ task }
        day={day}
        taskWindowVisible={ taskWindowVisible }
        currentId={ currentId }/>;
    });
  }

  getHideBtnTemplate(day) {
    return <div ref={`btn-hide-${day.format('DD')}`} className='btn-more'
                onClick={this.toggleMoreTasks.bind(this, day)}>
      <span className='btn-more__text'>Скрыть</span>
      <span className='btn-more__icon fa fa-arrow-up'/>
    </div>;
  }


  getMoreBtn(day) {
    return (
      <div className='btn-more' onClick={this.toggleMoreTasks.bind(this, day)}>
        <span className='btn-more__text'>Еще задачи</span>
        <span className='btn-more__icon fa fa-arrow-down'/>
      </div>
    );
  }

  getCalendarTemplate() {
    const { moreTasksVisible, dayToShowMoreTasks } = this.state;
    const { calendar, month, incompleteTasks } = this.props;
    let weeks = [];
    if (calendar) {
      weeks = calendar.map((week, id) => {
        let dayList = [];
        for (let day of week.by('days')) {
          dayList.push(day);
        }

        let days = dayList.map((day, dayId) => {
          let dayClasses = 'calendar-container__cell';
          if (!(day.month() === month)) {
            dayClasses += ' calendar-container__cell--muted';
          }
          const sortedTasks = sortTasks(incompleteTasks, 'hours');
          const tasksToday = this.getTasksForToday(day, sortedTasks);
          const tasksTemplatesForToday = tasksToday.length > 0 ? this.getTasksTemplatesByDay(tasksToday, day) : null;
          if (!tasksTemplatesForToday) dayClasses += ' calendar-container__cell--empty';
          return (
            <div id={day.format('DD-MM-YYYY')} className={dayClasses} key={dayId}>
              <p className='calendar-container__date'>
                { day.format('D') }
              </p>
              <p className='calendar-container__date--extended'>
                { day.locale('ru').format('dd').toString().toUpperCase()}
              </p>
              <div className="cell__tasks-list" ref={`list-${day.format('DD')}`}>
                {tasksTemplatesForToday}
                {
                  moreTasksVisible && day.format('DD-MM') === dayToShowMoreTasks.format('DD-MM') &&
                  tasksTemplatesForToday && tasksTemplatesForToday.length > 2
                    ? this.getHideBtnTemplate(day)
                    : null
                }
              </div>
              <div className="more-tasks-container" ref={`btn-show-${day.format('DD')}`}>
                {
                  tasksTemplatesForToday && tasksTemplatesForToday.length > 2
                    ? this.getMoreBtn(day)
                    : null
                }
              </div>
            </div>
          );
        });

        return (
          <div className='calendar-container__row' key={ id }>
            { days }
          </div>
        );
      });
    }
    return weeks;
  }

  updateTask(task, day) {
    this.props.updateTask(task);
    this.toggleTaskWindow(task._id, day || null);
  }

  getDayNamesTemplate() {
    const { dayNames } = this.props;
    return dayNames.map((day, id) => {
      return (
        <div key={id} className='dayname-container'>
          <span className='dayname-container__name'>{day}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='col-xs-12 col-sm-12 col-md-12' style={{ padding: 0 }}>
        <div className='calendar-container__daynames'>
          {::this.getDayNamesTemplate()}
        </div>
        {this.getCalendarTemplate()}
      </div>
    );
  }
}