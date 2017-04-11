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
    const { title, date, updateTask } = this.props;
    const { hours, minutes } = this.state;

    const newDate = moment(date)
        .hour(hours)
        .minute(minutes)
        .format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z';
    updateTask({
      title,
      end: newDate,
      done: false
    })

  }

  componentDidMount() {
    const { date, title } = this.props;
    const hours = moment.parseZone(date).format('HH');
    const minutes = moment.parseZone(date).format('mm');
    this.setState({
      hours,
      minutes
    })
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
          <input className="input input--blue task-card__input" type="number" value={hours}/>
          <span className="task-card__separator">:</span>
          <input className="input input--blue task-card__input" type="number" value={minutes}/>
        </div>
        <button className="btn btn-bordered task-card__btn" onClick={::this.saveNewTime}>Сохранить</button>
      </div>
    )
  }
}