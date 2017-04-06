import Moment from 'moment';
import React, {Component} from 'react';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);
export default class CalendarHeader extends Component {
  constructor(props) {
    super(props)
  }

  previousMonth(e) {
    this.props.previousMonth(e);
  }

  nextMonth(e) {
    this.props.nextMonth(e);
  }

  render() {
    const { dayNames, month, year } = this.props;

    const dayNamesRow = dayNames.map(day => {
      return <td>{day}</td>
    });

    return (
      <thead>
      <tr className="calendar__day-names">
        {dayNamesRow}
      </tr>
      <tr>
        <td>
          <a href="#" className="calendar__nav calendar__nav--previous" onClick={ ::this.previousMonth }>
            <span className="fa fa-angle-left"/>
          </a>
        </td>
        <td colSpan="5"><span
          className="calendar__selected-date">{ moment().month(month).format("MMMM") } { year }</span>
        </td>
        <td>
          <a href="#" className="calendar__nav calendar__nav--next" onClick={ ::this.nextMonth }>
            <span className="fa fa-angle-right"/>
          </a>
        </td>
      </tr>
      </thead>
    )
  }
}