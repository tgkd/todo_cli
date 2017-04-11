import Moment from 'moment';
import React, {Component} from 'react';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export default class extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { date, title } = this.props;
    const hours = moment.parseZone(date).format('HH');
    const minutes = moment.parseZone(date).format('mm');
    const taskDate = moment(date).locale('ru').format('DD MMM YYYY');
    return (
      <div className="task-card">
        <h1 className="task-card__header">{title}</h1>
        <p className="task-card__date">{taskDate}</p>
        <input className="input input--blue task-card__input" type="text" value={hours}/>
        <input className="input input--blue task-card__input" type="text" value={minutes}/>
        <button>Сохранить</button>
      </div>
    )
  }
}