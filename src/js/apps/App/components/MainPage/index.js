import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class extends Component {
  constructor(props) {
    super(props);
    this.containers = [
      {
        img: '/assets/profile.svg',
        name: 'Профиль'
      },
      {
        img: '/assets/tasks.svg',
        name: 'Дела'
      },
      {
        img: '/assets/calendar.svg',
        name: 'Календарь'
      }
    ]
  }

  render() {
    const containers = this.containers.map((item, id) => {
      return (
        <div className="col-xs-3 col-md-3 col-sm-3">
          <div className="row center-xs center-sm center-md">
            <div className="col-md-12 col-xs-12 col-sm-12">
              <img src={item.img} alt={item.name} />
            </div>
          </div>
          <div className="row center-xs center-sm center-md">
            <div className="col-md-12 col-xs-12 col-sm-12">
              <h1>{item.name}</h1>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="row around-xs around-sm around-md">
        {containers}
      </div>
    )
  }
}