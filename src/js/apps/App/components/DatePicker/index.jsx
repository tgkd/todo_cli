import moment from 'moment';
import React, {Component} from 'react';

import CalendarHeader from './header';
import Weeks from './weeksTable';
import {getCalendar} from 'libs/dateCreator';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    let month = moment().month();
    let year = moment().year();
    this.state = {
      date: moment(),
      month: month,
      year: year,
      calendar: getCalendar(year, month),
      dayNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    };

    this.clickEvent = this.clickEvent.bind(this);
  }

  setDate(day, e) {
    e.preventDefault();
    this.setState({
      date: day
    });
    this.props.setDate(day);
  }

  nextMonth(e) {
    e.preventDefault();
    const { month, year } = this.state;
    let newMonth;
    let newYear;
    if (month === 11) {
      newMonth = 0;
      newYear = year + 1;
    }
    else {
      newMonth = month + 1;
      newYear = year;
    }
    this.setState({
      month: newMonth,
      year: newYear,
      calendar: getCalendar(newYear, newMonth)
    });
  }

  previousMonth(e) {
    e.preventDefault();
    let month;
    let year;
    if (this.state.month === 0) {
      month = 11;
      year = this.state.year - 1;
    }
    else {
      month = this.state.month - 1;
      year = this.state.year;
    }
    this.setState({
      month: month,
      year: year,
      calendar: getCalendar(year, month)
    });
  }

  componentDidMount() {
    const { date } = this.props;
    const newDate = moment(date, 'DD-MM-YYYY');
    document.getElementById('root').addEventListener('click', this.clickEvent);
    if (newDate.isValid()) {
      this.setState({
        date: newDate,
        month: moment(newDate).month(),
        year: moment(newDate).year(),
        calendar: getCalendar(moment(newDate).year(), moment(newDate).month())
      });
    } else {
      this.setState({
        date: moment()
      });
    }
  }

  componentWillUnmount() {
    document.getElementById('root').removeEventListener('click', this.clickEvent);
  }

  clickEvent(e) {
    const { toggleCalendar } = this.props;
    const target = e.target.className;
    let calendar = -1;
    let calendarNav = -1;
    if (typeof target === 'string') {
      calendar = target.indexOf('calendar__');
      calendarNav = target.indexOf('fa');
    }
    if (calendar < 0 && calendarNav < 0 && target !== '') {
      toggleCalendar();
    }
  }

  render() {
    const { month, year, date, dayNames, calendar } = this.state;
    return <div>
      <div className="calendar" ref={(datePicker) => {
        this.datePicker = datePicker;
      }}>
        <table className="calendar__table">
          <CalendarHeader nextMonth={::this.nextMonth} previousMonth={::this.previousMonth} year={year}
                          dayNames={dayNames} month={month}/>
          <Weeks setDate={::this.setDate} calendar={calendar} month={month} date={date}/>
        </table>
      </div>
    </div>;
  }
}


export default DatePicker;