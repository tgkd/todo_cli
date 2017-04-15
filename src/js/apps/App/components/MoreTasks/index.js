import moment from 'moment';
import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  getTasksListTemplate(){
    const { tasks } = this.props;
    return tasks.map(task => {
      return (
        <div className="row">
          <div className="col-md-7">{task.title}</div>
          <div className="col-md-3">{moment(task.end).format('DD-MM-YYYY')}</div>
          <div className="col-md-2">{moment.parseZone(task.end).format('HH-mm')}</div>
        </div>
      )
    })
  }

  render() {

    return (
      <div className="more-tasks-container">
        {::this.getTasksListTemplate()}
      </div>
    )
  }
}