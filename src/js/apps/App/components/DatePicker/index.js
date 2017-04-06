import Moment from 'moment';
import React, {Component} from 'react';
import {extendMoment} from 'moment-range';
import CalendarHeader from './header';
import Weeks from './weeksTable';
import getCalendar from './dateCreator';

const moment = extendMoment(Moment);
moment.locale('ru');

class DatePicker extends Component {
  constructor(props) {
    super(props);
    let month = moment().month();
    let year = moment().year();
    this.state = {
      date: null,
      month: month,
      year: year,
      calendar: getCalendar(year, month),
      dayNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    }
  }

  setDate(day, e) {
    e.preventDefault();
    this.setState({
      date: day
    });

    this.props.setDate(day.format("D MMMM YYYY"))

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
    })
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
    })
  }

  /*
   componentDidMount(){
   const {date} = this.props;
   const newDate = moment(date, 'DD-MM-YYYY');
   if(newDate.isValid()){
   this.setState({
   date: newDate,
   calendar: getCalendar(moment(newDate).year(), moment(newDate).month())
   })
   } else {
   this.setState({
   date: moment()
   })
   }
   }
   */

  render() {
    const { month, year, date, dayNames, calendar } = this.state;
    const userDate = moment(date, 'DD-MM-YYYY');
    return <div>
      <div className="calendar">
        <table className="calendar__table">
          <CalendarHeader nextMonth={::this.nextMonth} previousMonth={::this.previousMonth} year={year}
                          dayNames={dayNames} month={month}/>
          <Weeks setDate={::this.setDate} calendar={calendar} month={month} date={userDate || date}/>
        </table>
      </div>
    </div>
  }
}

DatePicker.defaultProps = {
  date: moment()
};

export default DatePicker;