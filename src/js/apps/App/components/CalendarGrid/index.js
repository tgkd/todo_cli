import Moment from 'moment';
import React, {Component} from 'react';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export default class Weeks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dayNames, calendar, month, incompleteTasks } = this.props;
    const dayNamesRow = dayNames.map(day => {
      return (
        <div className="dayname-container">
          <span className="dayname-container__name">{day}</span>
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
          let dayClasses = "calendar-container__cell";
          if (!(day.month() === month)) {
            dayClasses += " calendar-container__cell--muted";
          }

          const taskToday = incompleteTasks.map(task => {
            console.log(moment(task.end).format('DD-MM-YYYY'));
            console.log(day.format('DD-MM-YYYY'));
            if(day.format('DD-MM-YYYY') === moment(task.end).format('DD-MM-YYYY')){
              return (
                <div className="cell__task">
                  {task.title}
                </div>
              )
            }
          });

          return (
            <div className={dayClasses} key={day.format('D-MM')}>
              <span href="#" className="calendar-container__date">{ day.format('D') }</span>
              {taskToday}
            </div>
          )
        });

        return (
          <div className="calendar-container__row" key={ id }>
            { days }
          </div>
        )
      });
    }

    return (
      <div className="col-xs-12 col-sm-12 col-md-12" style={{padding: 0}}>
        <div className="calendar-container__daynames">
          {dayNamesRow}
        </div>
        {weeks}
      </div>
    )
  }
}