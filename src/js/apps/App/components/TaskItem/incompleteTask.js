import React, { Component } from 'react';
import Checkbox from '../Checkbox';

import Moment from 'moment';
import {extendMoment} from 'moment-range';
const moment = extendMoment(Moment);
moment.locale('ru');

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      done: '',
      end: '',
      _id: ''
    }
  }

  componentDidMount() {
    const {task} = this.props;

    this.setState({
      title: task.title,
      done: task.done,
      end: task.end,
      _id: task._id
    });
  }

  updateTask() {
    this.setState({
      done: true
    });
    this.props.updateTask({
      ...this.state,
      done: true
    });
  }

  render() {
    const { task } = this.props;
    const endDate = moment(task.end);
    const date = endDate.isValid() ? endDate.format('D MMMM YYYY').toString() : '-';
    return (

      <div className='row middle-xs middle-sm middle-md tasks-container__task task task--incomplete'>
        <div className='col-xs-1 col-sm-1 col-md-1'>
          <Checkbox checked={false} changeState={::this.updateTask} disabled={false}/>
          {/*<input type='checkbox' checked={false} onChange={::this.updateTask}/>*/}
        </div>
        <div className='col-xs-9 col-sm-9 col-md-9'>
          <p className='task__name'>{task.title}</p>
        </div>
        <div className='col-xs-2 col-sm-2 col-md-2'>
          <span className='task__end'>{date}</span>
        </div>
      </div>

    )
  }
}
