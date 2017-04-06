import Moment from 'moment';
import React, {Component} from 'react';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export default class Weeks extends Component {
  constructor(props) {
    super(props)
  }

  setDate(day, e) {
    this.props.setDate(day, e);
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
          let dayClasses = "calendar__day";
          if (!(day.month() === month)) {
            dayClasses += " calendar__day--muted";
          }
          if (day.format('DD-MM-YYYY') === date.format('DD-MM-YYYY')) {
            dayClasses += " calendar__day--selected";
          }
          if (day.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')) {
            dayClasses += " calendar__day--today";
          }
          return <td className="calendar__cell" key={day.format('D-MM')}>
            <a href="#" className={ dayClasses } onClick={ this.setDate.bind(this, day) }>{ day.format('D') }</a></td>
        });
        return <tr key={ id }>{ days }</tr>
      });
    }

    return (
      <tbody>
      {weeks}
      </tbody>
    )
  }
}