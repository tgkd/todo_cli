import React, {Component} from 'react';

import ProfileInfo from '../ProfileInfo';
import UserSession from '../UserSession';
import DatePicker from '../DatePicker';

import Moment from 'moment';
import {extendMoment} from 'moment-range';
const moment = extendMoment(Moment);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        birthday: '',
        photo: '',
        formattedDate: null
      },
      calendarVisible: false,
      sessions: this.props.sessions
    }
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      const birthday = moment(user.birthday);
      if (birthday.isValid()) {
        this.setState({
          user: {
            ...user,
            birthday: birthday.format('DD MMMM YYYY').toString(),
            formattedDate: moment(user.birthday)
          }
        })
      }
    }
  }

  componentDidUpdate() {
    const { user } = this.props;
    const userState = this.state.user;
    if (user && !userState._id) {
      const birthday = moment(user.birthday);
      console.log(birthday.toString());
      if (birthday.isValid()) {
        this.setState({
          user: {
            ...user,
            birthday: birthday.format('DD MMMM YYYY').toString(),
            formattedDate: moment(user.birthday)
          }
        })
      }
    }
  }

  setName(e) {
    this.setState({
      user: {
        ...this.state.user,
        name: e.target.value
      }
    })
  }

  setUserBirthday(e) {
    const date = moment(e.target.value);
    if (date.isValid()) {
      this.setDate(date)
    }
  }

  setDate(date) {
    console.log(date.locale('ru').format('D MMMM YYYY'));
    this.setState({
      calendarVisible: false,
      user: {
        ...this.state.user,
        birthday: date.locale('ru').format('D MMMM YYYY'),
        formattedDate: date
      }
    })
  }

  saveHandler() {
    const { user } = this.state;
    let date = user.formattedDate.format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z';
    const result = {
      ...user,
      birthday: date
    };
    this.props.updateUserInfo(result);
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (upload) => {
      this.setState({
        user: {
          ...this.state.user,
          photo: upload.target.result
        }
      });
    };

    reader.readAsDataURL(file);
  }


  terminateSession(id) {
    this.props.termianteUserSession(id);
  }

  toggleCalendar(e) {
    
    this.setState({
      calendarVisible: !this.state.calendarVisible
    })
  }

  render() {
    const { sessions } = this.props;
    const { user, calendarVisible } = this.state;
    let sessionsList;
    if (sessions) {
      sessionsList = sessions.map(item => {
        return (
          <div className='col-xs-8 col-sm-8 col-md-8' key={item._id}>
            <UserSession os={item.os} type={item.type} browser={item.browser} id={item._id}
                         terminateSession={::this.terminateSession}/>
          </div>
        )
      })
    }
    return (
      <div className='profile-container col-xs-10 col-sm-10 col-md-10'>
        <div className='row center-xs center-sm center-md'>
          <div className='col-xs-12 col-sm-12 col-md-12'>
            <h1 className='profile-container__header'>Настройки профиля</h1>
          </div>
          <ProfileInfo handleFile={::this.handleFile} photo={user.photo}/>
        </div>
        <div className='row center-xs center_sm center-md'>
          <div className='col-xs-4 col-sm-4 col-md-4'>
            <input className='input input--blue profile-container__input-name' type='text' placeholder='Введите имя'
                   value={user.name} onChange={::this.setName}/>
          </div>
        </div>
        <div className='row center-xs center_sm center-md'>
          <div className='col-xs-4 col-sm-4 col-md-4'>

            <div className='input-container'>
              <input className='input input--blue profile-container__input-date'
                     type='text'
                     placeholder='Введите дату рождения'
                     onChange={::this.setUserBirthday}
                     value={user.birthday}/>
              <div
                className='input-container__img profile-container__datepicker row middle-xs middle-sm middle-md end-xs end-sm end-md'
                onClick={::this.toggleCalendar}>
                <svg
                  className='input-container__calendar-ico'
                  width='18' height='20' viewBox='0 0 18 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>8F18FF8D-0089-4998-AECB-EA32DEACFFFF</title>
                  <path
                    d='M16 2h-1V0h-2v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H2V7h14v11zM4 9h5v5H4V9z'
                    fill='#566394' fill-rule='evenodd'/>
                </svg>
              </div>
              {calendarVisible && <DatePicker date={user.formattedDate || null} setDate={::this.setDate}/>}
            </div>


          </div>
        </div>
        <div className='row center-md center-sm center-xs'>
          <div className='col-xs-4 col-sm-4 col-md-4'>
            <button className='btn btn-enter btn--greyblue' onClick={::this.saveHandler}>Сохранить</button>
          </div>
        </div>
        <hr/>

        <div className='row center-xs center-sm center-md'>
          <div className='col-md-12 col-xs-12 col-sm-12'>
            <h1 className='profile-container__header'>Ваши сессии</h1>
          </div>
          {sessionsList}

        </div>

      </div>
    )
  }
}
