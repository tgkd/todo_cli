import Moment from 'moment';
import React, {Component} from 'react';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '',
      minutes: ''
    }
  }

  setHours(e) {
    this.setState({
      hours: parseInt(e.target.value) > 23 ? '00' : e.target.value
    })
  }

  setMinutes(e) {
    this.setState({
      minutes: parseInt(e.target.value) > 59 ? '00' : e.target.value
    })
  }


  saveNewTime() {
    const { title, date, updateTask, _id } = this.props;
    const { hours, minutes } = this.state;

    const newDate = moment(date)
        .hour(parseInt(hours))
        .minute(parseInt(minutes))
        .format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z';
    updateTask({
      title,
      _id,
      end: newDate,
      done: false
    })
  }

  hoursOnKeyDown(event) {
    if (event.keyCode === 38) {
      const { hours } = this.state;
      let hour = parseInt(hours);
      let nextHour = hour === 23 ? '00' : hour + 1;
      nextHour = nextHour.toString();
      this.setState({
        hours: nextHour.length === 1 ? '0' + nextHour : nextHour
      })
    } else if (event.keyCode === 40) {
      const { hours } = this.state;
      let hour = parseInt(hours);
      let nextHour = hour === 0 ? 23 : hour - 1;
      nextHour = nextHour.toString();
      this.setState({
        hours: nextHour.length === 1 ? '0' + nextHour : nextHour
      })
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
      })
    } else if (event.keyCode === 40) {
      const { minutes } = this.state;
      let minute = parseInt(minutes);
      let nextMin = minute === 0 ? '59' : minute - 1;
      nextMin = nextMin.toString();
      this.setState({
        minutes: nextMin.length === 1 ? '0' + nextMin : nextMin
      })
    }
  }


  componentDidMount() {
    const { date } = this.props;
    const hours = moment.parseZone(date).format('HH');
    const minutes = moment.parseZone(date).format('mm');
    this.setState({
      hours,
      minutes
    });
    this.hoursInput.focus();
  }


  render() {
    const { date, title } = this.props;
    const { hours, minutes } = this.state;

    const taskDate = moment(date).locale('ru').format('DD MMM YYYY');
    return (
      <div className="task-card">
        <h1 className="task-card__header">{title}</h1>
        <p className="task-card__date">{taskDate}</p>
        <div className="task-card__inputs">
          <input
            className="input input--blue task-card__input"
            type="text"
            value={hours}
            ref={(input) => {
              this.hoursInput = input;
            }}
            onKeyDown={::this.hoursOnKeyDown}
          />
          <span className="task-card__separator">:</span>
          <input
            className="input input--blue task-card__input"
            type="text"
            value={minutes}
            onKeyDown={::this.minutesOnKeyPress}
          />
        </div>
        <button className="btn btn-bordered task-card__btn" onClick={::this.saveNewTime}>Сохранить</button>
      </div>
    )
  }
}