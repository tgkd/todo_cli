import moment from 'moment';
import React, {Component} from 'react';

export default class CalendarHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dayNames, month, year, previousMonth, nextMonth } = this.props;

    const dayNamesRow = dayNames.map(day => {
      return <td>{day}</td>
    });

    return (
      <thead>
      <tr className="calendar__day-names">
        {dayNamesRow}
      </tr>
      <tr className="calendar__month-name">
        <td>
          <a href="#" className="calendar__nav calendar__nav--previous" onClick={ previousMonth }>
            <span className="fa fa-angle-left"/>
          </a>
        </td>
        <td colSpan="5"><span
          className="calendar__selected-date">{ moment().locale('ru').month(month).format("MMMM") } { year }</span>
        </td>
        <td>
          <a href="#" className="calendar__nav calendar__nav--next" onClick={ nextMonth }>
            <span className="fa fa-angle-right"/>
          </a>
        </td>
      </tr>
      </thead>
    )
  }
}