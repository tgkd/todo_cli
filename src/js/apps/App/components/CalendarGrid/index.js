import Moment from 'moment';
import React, {Component} from 'react';
import TaskCard from '../TaskCard';
import {extendMoment} from 'moment-range';


const moment = extendMoment(Moment);

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
    /*    if(this.props.incompleteTasks) {
     this.sortTasksByTime();
     }*/

    this.setState({
      tasks: this.props.incompleteTasks
    })
  }

  componentDidUpdate() {

  }

  toggleTaskWindow() {
    this.setState({
      taskWindowVisible: !this.state.taskWindowVisible
    })
  }

  updateTask(task) {
    this.props.updateTask(task);
    this.toggleTaskWindow()
  }

  render() {
    const { dayNames, calendar, month } = this.props;
    const { incompleteTasks } = this.props;
    const { taskWindowVisible } = this.state;
    const dayNamesRow = dayNames.map(day => {
      return (
        <div className='dayname-container'>
          <span className='dayname-container__name'>{day}</span>
        </div>
      )
    });

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
                <div className='cell__task' key={id}>
                  <div>
                    <span className='cell__task-name' onClick={::this.toggleTaskWindow}>{task.title}</span>
                    <span className='cell__task-time'>{time}</span>
                    {taskWindowVisible &&
                    <TaskCard title={task.title} _id={task._id} updateTask={::this.updateTask} date={task.end}/>}
                  </div>
                </div>
              )
            }
          });

          return (
            <div className={dayClasses} key={day.format('D-MM')}>
              <p href='#' className='calendar-container__date'>{ day.format('D') }</p>
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