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
      sessions: [],
      message: {
        error: false,
        text: ''
      }
    };
    this.incorrectDateMessage = 'Неверный формат даты';
  }

  componentDidMount() {
    const { user, sessions } = this.props;
    if (user) {
      const birthday = moment(user.birthday);

      this.setState({
        user: {
          ...user,
          birthday: birthday.isValid() ? birthday.locale('ru').format('DD MMMM YYYY').toString() : '',
          formattedDate: birthday.isValid() ? moment(user.birthday) : null
        },
        sessions: sessions
      })
    }

    document.getElementById('root').addEventListener('click', (e) => {
      const target = e.target.className;
      let calendar = -1;
      let calendarNav = -1;
      if (typeof target === 'string') {
        calendar = target.indexOf('calendar');
        calendarNav = target.indexOf('fa');
      }
      if (calendar < 0 && calendarNav < 0 && target !== '') {
        this.setState({
          calendarVisible: false
        })
      }
    });
  }

  componentDidUpdate() {
    const { user, sessions } = this.props;
    const userState = this.state.user;
    if (user && !userState._id) {
      const birthday = moment(user.birthday);
      this.setState({
        user: {
          ...user,
          birthday: birthday.isValid() ? birthday.locale('ru').format('DD MMMM YYYY').toString() : '',
          formattedDate: birthday.isValid() ? moment(user.birthday) : null
        },
        sessions: sessions
      })
    }
  }

  updateUserInfo() {
    const { updateUserInfo } = this.props;
    const { user } = this.state;
    if (!user.formattedDate.isValid()) {
      this.setState({
        message: {
          error: true,
          text: this.incorrectDateMessage
        }
      });
      return;
    }
    let date = user.formattedDate.format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z';
    const result = {
      ...user,
      birthday: date
    };
    updateUserInfo(result)
      .then(user => {
        this.setState({
          message: {
            error: false,
            text: 'success'
          }
        })
      })
      .catch(e => {
        this.setState({
          message: {
            error: true,
            text: 'Ошибка, повторите попытку'
          }
        })
      })
  }

  terminateUserSession(id) {
    const { terminateUserSession } = this.props;
    terminateUserSession(id)
      .catch(e => {
        this.setState({
          message: {
            error: true,
            text: 'Ошибка, повторите попытку'
          }
        })
      })
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
    this.setState({
      user: {
        ...this.state.user,
        birthday: e.target.value,
        formattedDate: date
      }
    });
  }

  setDate(date) {
    const { message } = this.state;
    if (date.isValid()) {
      this.setState({
        calendarVisible: false,
        user: {
          ...this.state.user,
          birthday: date.locale('ru').format('D MMMM YYYY'),
          formattedDate: date
        },
        message: {
          error: false,
          text: message.text === this.incorrectDateMessage ? '' : message.text
        }
      })
    } else {
      this.setState({
        formattedDate: date
      })
    }
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


  toggleCalendar(e) {
    this.setState({
      calendarVisible: !this.state.calendarVisible
    })
  }

  getInputClass() {
    return `input 
    ${this.state.message.text === this.incorrectDateMessage ? 'input--red' : 'input--blue'}
     profile-container__input-date`
  }

  getAlertClass() {
    return `alert-ico ${this.state.message.error ? '' : 'alert-ico--hidden'}`
  }


  render() {
    const { sessions, user, calendarVisible, message } = this.state;
    let sessionsList;
    if (sessions) {
      sessionsList = sessions.map(item => {
        return (
          <div className='col-xs-8 col-sm-8 col-md-8' key={item._id}>
            <UserSession os={item.os} type={item.type} browser={item.browser} id={item._id}
                         terminateSession={::this.terminateUserSession}/>
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
        <div className='row center-xs center_sm center-md profile-container__input-name'>
          <div className='col-xs-4 col-sm-4 col-md-4'>
            <input className='input input--blue ' type='text' placeholder='Введите имя'
                   value={user.name} onChange={::this.setName}/>
          </div>
        </div>
        <div className='row center-xs center_sm center-md'>

          <div className='col-xs-4 col-sm-4 col-md-4'>

            <div className='input-container'>
              <input className={::this.getInputClass()}
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
                    fill='#566394'/>
                </svg>
              </div>
              {calendarVisible && <DatePicker date={user.formattedDate || null} setDate={::this.setDate}/>}
            </div>
            <div className={message.error ? '' : 'alert-container--hidden'}>
              <span className='profile-container__message alert-message'>{ message.text }</span>
            </div>
          </div>

        </div>
        <div className='row center-md center-sm center-xs profile-container__btn'>
          <div className='col-xs-4 col-sm-4 col-md-4'>
            <button className='btn btn-enter btn--greyblue' onClick={::this.updateUserInfo}>Сохранить</button>
            <div className={!message.error && message.text === 'success' ? '' : 'alert-container--hidden'}>
              <span className='alert-message--success'>{ message.text }</span>
            </div>
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
