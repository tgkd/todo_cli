import moment from 'moment';
import React, {Component} from 'react';

import {getCalendar} from 'libs/dateCreator';
import CalendarHeader from '../CalendarHeader';
import CalendarGrid from '../CalendarGrid';


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

  async updateTask(task) {
    const { updateTask } = this.props;
    try {
      await updateTask(task);
    } catch (e) {
      this.setState({ error: 'error' });
    }
  }

  componentDidMount() {
    const { date } = this.props;
    const newDate = moment(date, 'DD-MM-YYYY');
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

  render() {
    const { month, year, date, dayNames, calendar } = this.state;
    return (
      <div className='calendar-container col-xs-10 col-sm-10 col-md-10 col-lg-7'>
          <div className='row center-xs center-sm center-md'>
            <div className='col-xs-12 col-sm-12 col-md-12'>
              <h1 className='calendar-container__header'>Календарь</h1>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-12'>
              <CalendarHeader nextMonth={::this.nextMonth}
                              previousMonth={::this.previousMonth}
                              year={year}
                              month={month}/>
            </div>
            <CalendarGrid dayNames={dayNames}
                          calendar={calendar}
                          updateTask={::this.updateTask}
                          month={month}
                          date={date}
                          incompleteTasks={this.props.incompleteTasks}/>
          </div>
        </div>
      );
  }
}

DatePicker.defaultProps = {
  date: moment()
};

export default DatePicker;