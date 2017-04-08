import Moment from 'moment';
import React, {Component} from 'react';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export default class Weeks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { calendar, month, date } = this.props;
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

          return (
            <div className={dayClasses} key={day.format('D-MM')}>
              <span href="#" className="calendar-container__date">{ day.format('D') }</span>
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
      <div className="col-xs-12 col-sm-12 col-md-12">
        {weeks}
      </div>
    )
  }
}