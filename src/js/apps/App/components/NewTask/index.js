import React, {Component} from 'react';
import DatePicker from '../DatePicker';

import Moment from 'moment';
import {extendMoment} from 'moment-range';
const moment = extendMoment(Moment);
moment.locale('ru');

export default class extends Component {
  constructor(props) {
    super(props);
    const now = moment();
    this.state = {
      title: '',
      end: now.format('D MMMM YYYY'),
      done: false,
      calendarVisible: false,
      formattedDate: now,
      error: false,
      errorMessage: ''
    }
  }

  toggleCalendar() {
    this.setState({
      calendarVisible: !this.state.calendarVisible
    })
  }

  isValidInput() {
    const { title, formattedDate } = this.state;
    return !((title.length === 0 ) || !formattedDate.isValid());

  }

  createTask() {
    const { title, done, formattedDate } = this.state;
    const newTask = {
      title,
      end: formattedDate.format('D-MM-YYYY').toString(),
      done
    };
    if (this.isValidInput()) {
      this.props.createHandler(newTask);
    } else {
      this.setState({
        error: true,
        errorMessage: 'Укажите название задачи'
      })
    }
  }

  setTaskTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  setDate(date) {
    this.setState({
      calendarVisible: false,
      end: date.format('D MMMM YYYY'),
      formattedDate: date
    })
  }

  getInputClass() {
    let { error } = this.state;
    let { apiError } = this.props;
    return `input ${error || apiError ? 'input--red' : 'input--blue'} tasks-container__input`
  }

  render() {
    const { calendarVisible, end } = this.state;
    return (
      <div className='row middle-xs middle-sm middle-md'>
        <div className='col-xs-10 col-sm-10 col-md-10'>
          <div className='input-container'>
            <input type='text' className={::this.getInputClass()} onChange={::this.setTaskTitle}
                   placeholder='Новое дело'/>
            <div
              className="input-container__img tasks-container__datepicker row middle-xs middle-sm middle-md end-xs end-sm end-md"
              onClick={::this.toggleCalendar}>
              <span className='input-container__date'>{end}</span>
              <svg
                className='input-container__calendar-ico'
                width="18" height="20" viewBox="0 0 18 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>8F18FF8D-0089-4998-AECB-EA32DEACFFFF</title>
                <path
                  d="M16 2h-1V0h-2v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H2V7h14v11zM4 9h5v5H4V9z"
                  fill="#566394" fill-rule="evenodd"/>
              </svg>
              {/*<img className='tasks-container__calendar-ico' src='/assets/little-calendar.svg' alt='calendar' onClick={::this.toggleCalendar}/>*/}
            </div>
            {calendarVisible && <DatePicker setDate={::this.setDate}/>}
          </div>
        </div>
        <div className='col-xs-2 col-sm-2 col-md-2'>
          <button className='btn btn-default btn--greyblue' onClick={::this.createTask}>Добавить</button>
        </div>
      </div>
    )
  }
}