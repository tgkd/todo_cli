import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class extends Component {
  constructor(props) {
    super(props);
    this.containers = [
      {
        img: '/assets/main_page/profile.svg',
        name: 'Профиль',
        route: '/profile'
      },
      {
        img: '/assets/main_page/todolist.svg',
        name: 'Дела',
        route: '/tasks'
      },
      {
        img: '/assets/main_page/calendar.svg',
        name: 'Календарь',
        route: '/calendar'
      }
    ]
  }

  render() {
    const containers = this.containers.map((item, id) => {
      return (
        <Link className='main__link' to={item.route}>
          <div key={id} className='main__item col-xs-3 col-md-3 col-sm-3'>
            <div className='row center-xs center-sm center-md'>
              <div className={'main__item-icon col-md-12 col-xs-12 col-sm-12 main__item-icon-' + id}>
                <img src={item.img} alt={item.name}/>
              </div>
            </div>
            <div className='row center-xs center-sm center-md'>
              <div className='col-md-12 col-xs-12 col-sm-12'>
                <h1 className="main__item-name">{item.name}</h1>
              </div>
            </div>
          </div>
        </Link>
      )
    });

    return (
      <div className='main-container row around-xs around-sm around-md'>
        {containers}
      </div>
    )
  }
}