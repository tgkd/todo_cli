import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      end: '',
      done: false
    }
  }

  createTask() {
    this.props.createTask(this.state);
  }

  render() {
    return (
      <div className="row middle-xs middle-sm middle-md tasks-container__task task task--completed">
        <div className="col-xs-10 col-sm-10 col-md-10">
          <input type="text" placeholder="Новое дело"/>
          <a href="#">
            <span>date</span>
            <image src="/assets/calendar-ico.svg"/>
          </a>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2">
          <button className="btn btn--greyblue" onClick={::this.createTask}>Добавить</button>
        </div>
      </div>
    )
  }
}