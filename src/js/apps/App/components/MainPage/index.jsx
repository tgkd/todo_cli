import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class extends Component {
  constructor(props) {
    super(props);
    this.containers = [
      {
        img: '/assets/images/main_page/profile.svg',
        imgStyle: {
          width: '110px',
          height: '110px'
        },
        name: 'Профиль',
        route: '/profile'
      },
      {
        img: '/assets/images/main_page/todolist.svg',
        imgStyle: {
          width: '114px',
          height: '114px'
        },
        name: 'Дела',
        route: '/tasks'
      },
      {
        img: '/assets/images/main_page/calendar.svg',
        imgStyle: {
          width: '86px',
          height: '95px'
        },
        name: 'Календарь',
        route: '/calendar'
      }
    ];
  }

  getLinksTemplates() {
    return this.containers.map((item, id) => {
      return (
        <Link key={id} className='main-container__link' to={item.route}>
          <div className='main-container__item col-xs-3'>
            <div className='row center-xs'>
              <div
                className={'main-container__item-icon col-xs-12 main-container__item-icon-' + id}>
                <img style={item.imgStyle} src={item.img} alt={item.name}/>
              </div>
            </div>
            <div className='row center-xs'>
              <div className='col-xs-12'>
                <h1 className="main-container__item-name">{item.name}</h1>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }

  async logout() {
    const { logout } = this.props;
    try {
      await logout();
      window.location.href = '/';
    } catch (e) {
      this.setState({
        error: 'Ошибка, повторите попытку'
      });
    }
  }

  render() {
    return (

      <div className="main-container">
        <div className="row end-xs main-container__nav">
          <div className="main-container__logout" onClick={::this.logout}>
            <img src="/assets/images/icons/exit.svg" alt="exit"/>
            <span>&nbsp;Выйти</span>
          </div>
        </div>
        <div className='row center-xs main-container__links'>
          {::this.getLinksTemplates()}
        </div>
      </div>
    );
  }
}