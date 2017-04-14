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

  getLinksTemplates() {
    return this.containers.map((item, id) => {
      return (
        <Link className='main-container__link' to={item.route}>
          <div key={id} className='main-container__item col-xs-3 col-md-3 col-sm-3'>
            <div className='row center-xs center-sm center-md'>
              <div
                className={'main-container__item-icon col-md-12 col-xs-12 col-sm-12 main-container__item-icon-' + id}>
                <img src={item.img} alt={item.name}/>
              </div>
            </div>
            <div className='row center-xs center-sm center-md'>
              <div className='col-md-12 col-xs-12 col-sm-12'>
                <h1 className="main-container__item-name">{item.name}</h1>
              </div>
            </div>
          </div>
        </Link>
      )
    });
  }

  logout() {
    const { logout } = this.props;
    logout()
      .then(response => {
        window.location.href = '/';
      })
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }

  render() {
    return (

      <div className="main-container">
        <div className='row around-xs around-sm around-md'>
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="row end-md end-sm end-xs">
              <div className="main-container__logout" onClick={::this.logout}>
                <img src="/assets/exit.svg" alt="exit"/>
                <span>&nbsp;Выйти</span>
              </div>
            </div>
          </div>
          {::this.getLinksTemplates()}
        </div>
      </div>

    )
  }
}