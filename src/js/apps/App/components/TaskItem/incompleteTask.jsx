import React, {Component} from 'react';
import moment from 'moment';
import Checkbox from '../Checkbox';
import Loader from 'components/Loader';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledTask: false
    };
  }

  updateTask() {
    this.setState({
      disabledTask: true
    }, () => {
      this.props.updateTask({
        ...this.props.task,
        done: true
      });
    });
  }

  getDisabledTemplate() {
    return (
      <div className="task--disabled">
        <Loader size='20'/>
      </div>
    );
  }

  getDateClass() {
    const { task } = this.props;
    const taskDate = moment.parseZone(task.end);
    const dateNow = moment().startOf('day');
    const diff = dateNow.diff(taskDate, 'days', true);
    return `${diff > 0 ? 'task__end--expired' : ''} task__end`;
  }

  render() {
    const { task } = this.props;
    const { disabledTask } = this.state;
    const endDate = moment.parseZone(task.end);
    const date = endDate.isValid() ? endDate.locale('ru').format('D MMMM YYYY').toString() : '-';
    return (
      <div className='row middle-xs tasks-container__task task task--incomplete'>
        { disabledTask ? this.getDisabledTemplate() : null}
        <div className='col-xs-1'>
          <Checkbox checked={false} changeState={::this.updateTask} disabled={false}/>
        </div>

        <div className='col-xs-6 col-sm-8 col-md-9'>
          <p className='task__name'>{task.title}</p>
        </div>

        <div className='col-xs-5 col-sm-3 col-md-2'>
          <span className={this.getDateClass()}>{date}</span>
        </div>
      </div>
    );
  }
}
