import React, { Component } from 'react';

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
    this.setState({
      title: this.props.task.title,
      done: this.props.task.done,
      end: this.props.task.end,
      _id: this.props.task.id
    });
  }

  updateTask() {
    this.setState({
      done: true
    });
    this.props.updateTask(this.state);
  }

  render() {
    const { task } = this.props;
    return (

      <div className="row middle-xs middle-sm middle-md tasks-container__task task task--incomplete">
        <div className="col-xs-1 col-sm-1 col-md-1">
          <input type="checkbox" checked={false} onChange={::this.updateTask}/>
        </div>
        <div className="col-xs-8 col-sm-8 col-md-8">
          <p className="task__name">{task.title}</p>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3">
          <span className="task__end">{task.end}</span>
        </div>
      </div>

    )
  }
}
