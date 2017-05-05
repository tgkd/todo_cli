import React, {Component} from 'react';
import moment from 'moment';
import DatePicker from '../DatePicker';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '',
      minutes: '',
      calendarVisible: false,
      formattedDate: null,
      taskDate: '',
      error: false,
      errorMessage: ''
    };
    this.clickEvent = this.clickEvent.bind(this);
    this.navHeight = 100;
  }

  setHours(e) {
    const inputValue = e.target.value !== '' ? parseInt(e.target.value, 10) : 0;
    let hours = inputValue > 23 ? '00' : inputValue < 0 ? '23' : inputValue;
    this.setState({
      hours: hours
    });
  }

  setMinutes(e) {
    const inputValue = e.target.value !== '' ? parseInt(e.target.value, 10) : 0;
    let minutes = inputValue > 59 ? '00' : inputValue < 0 ? '59' : inputValue;
    this.setState({
      minutes: minutes
    });
  }

  saveNewTime() {
    const { title, updateTask, _id, day } = this.props;
    const { hours, minutes, formattedDate } = this.state;
    if (!formattedDate.isValid()) {
      this.setState({
        error: true,
        taskDate: '',
        errorMessage: 'Неверный формат даты'
      });
      return;
    }
    const newDate = moment
        .parseZone(formattedDate)
        .hour(parseInt(hours, 10))
        .minute(parseInt(minutes, 10))
        .seconds(0)
        .format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z';
    updateTask({
      title,
      _id,
      end: newDate,
      done: false
    }, day);
  }

  hoursOnKeyDown(event) {
    if (event.keyCode === 38) {
      const { hours } = this.state;
      let hour = parseInt(hours);
      let nextHour = hour === 23 ? '00' : hour + 1;
      nextHour = nextHour.toString();
      this.setState({
        hours: nextHour.length === 1 ? '0' + nextHour : nextHour
      });
    } else if (event.keyCode === 40) {
      const { hours } = this.state;
      let hour = parseInt(hours);
      let nextHour = hour === 0 ? 23 : hour - 1;
      nextHour = nextHour.toString();
      this.setState({
        hours: nextHour.length === 1 ? '0' + nextHour : nextHour
      });
    }
  }

  minutesOnKeyPress(event) {
    if (event.keyCode === 38) {
      const { minutes } = this.state;
      let minute = parseInt(minutes);
      let nextMin = minute === 59 ? '00' : minute + 1;
      nextMin = nextMin.toString();
      this.setState({
        minutes: nextMin.length === 1 ? '0' + nextMin : nextMin
      });
    } else if (event.keyCode === 40) {
      const { minutes } = this.state;
      let minute = parseInt(minutes);
      let nextMin = minute === 0 ? '59' : minute - 1;
      nextMin = nextMin.toString();
      this.setState({
        minutes: nextMin.length === 1 ? '0' + nextMin : nextMin
      });
    }
  }

  componentDidMount() {
    const { date } = this.props;
    const hours = moment.parseZone(date).format('HH');
    const minutes = moment.parseZone(date).format('mm');
    const taskDate = moment.parseZone(date).format('DD.MM.YYYY');

    this.setState({
      hours,
      minutes,
      taskDate,
      formattedDate: moment(date)
    });

    this.dateInput.focus();
    document.getElementById('root').addEventListener('click', this.clickEvent);
  }

  componentWillUnmount() {
    document.getElementById('root').removeEventListener('click', this.clickEvent);
  }

  clickEvent(e) {
    const { toggleWindow, _id, day } = this.props;
    const className = e.target.className && e.target.className.length > 0;
    let isCard = true;
    let isCalendar = true;
    if (className) {
      isCard = e.target.className.indexOf('card') >= 0;
      isCalendar = e.target.className.indexOf('calendar__') >= 0;
    }
    if ((!isCard && !isCalendar) || className.length === 0) {
      toggleWindow(_id, day);
    }
  };

  disableClick(e) {
    e.stopPropagation();
  }

  setDate(date) {
    if (date.isValid()) {
      this.setState({
        calendarVisible: false,
        taskDate: date.format('DD.MM.YYYY'),
        formattedDate: date,
        error: false,
        text: ''
      });
    } else {
      this.setState({
        formattedDate: date
      });
    }
  }

  setTaskDate(e) {
    const date = moment(e.target.value, 'DD.MM.YYYY');
    this.setState({
      taskDate: e.target.value,
      formattedDate: date
    });
  }

  toggleCalendar(e) {
    const cliX = e && e.pageY;
    let containerHeight = document.getElementsByClassName('calendar-container');
    containerHeight = containerHeight[0].clientHeight + this.navHeight;

    this.setState({
      calendarVisible: !this.state.calendarVisible
    }, (clickPosition = cliX, maxHeight = containerHeight) => {
      if (this.state.calendarVisible) {
        const calendar = document.getElementsByClassName('calendar');
        const datePicker = calendar[0];

        datePicker.style.fontSize = '12px';
        const datePickerHeight = datePicker.clientHeight;

        if (clickPosition + datePickerHeight > maxHeight) {
          datePicker.style.top = -datePickerHeight + 'px';
        }
        datePicker.scrollIntoView();
      }
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.saveNewTime();
    }
  }

  render() {
    const { title, _id } = this.props;
    const { hours, minutes, taskDate, error, errorMessage, calendarVisible, formattedDate } = this.state;

    return (
      <div className="task-card" onClick={::this.disableClick} id={`card-${_id}`} onKeyPress={::this.handleKeyPress}>
        <h1 className="task-card__header">{title}</h1>
        <div className='input-container'>
          <input
            className={`input ${error ? 'input--red' : 'input--blue'} task-card__input-date`}
            type='text'
            placeholder={error ? errorMessage : 'Введите дату'}
            onChange={::this.setTaskDate}
            value={taskDate}
            ref={(input) => {
              this.dateInput = input;
            }}/>
          <div
            className='input-container__img task-card__datepicker row middle-xs end-xs'
            onClick={::this.toggleCalendar}>
            <svg
              className='input-container__calendar-ico'
              width='18' height='20' viewBox='0 0 18 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>8F18FF8D-0089-4998-AECB-EA32DEACFFFF</title>
              <path
                d='M16 2h-1V0h-2v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H2V7h14v11zM4 9h5v5H4V9z'
                fill='#566394'/>
            </svg>
          </div>
          {calendarVisible &&
          <DatePicker toggleCalendar={::this.toggleCalendar} date={formattedDate || null} setDate={::this.setDate}/>}
        </div>
        <div className="task-card__inputs">
          <input
            className="input input--blue task-card__input"
            type="text"
            value={hours}
            onKeyDown={::this.hoursOnKeyDown}
            onChange={::this.setHours}
          />
          <span className="task-card__separator">:</span>
          <input
            className="input input--blue task-card__input"
            type="text"
            value={minutes}
            onChange={::this.setMinutes}
            onKeyDown={::this.minutesOnKeyPress}
          />
        </div>
        <button className="btn btn-bordered task-card__btn" onClick={::this.saveNewTime}>Сохранить</button>
      </div>
    );
  }
}