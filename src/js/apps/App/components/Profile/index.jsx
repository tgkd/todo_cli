import moment from 'moment';
import React, {Component} from 'react';
import Loader from 'components/Loader';
import ProfileInfo from '../ProfileInfo';
import UserSession from '../UserSession';
import DatePicker from '../DatePicker';

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
      btnDisabled: false,
      btnText: 'Сохранить',
      message: {
        error: false,
        text: '',
        isSuccess: false
      }
    };
    this.incorrectDateMessage = 'Неверный формат даты';
    this.incorrectUsername = 'Введите корректное имя';
    this.successMessage = 'Сохранено';
    this.serverError = 'Ошибка, повторите попытку';

  }

  async getUserInfo() {
    const { getUserInfo } = this.props;

    await getUserInfo();
    this.setUserInfo();
  }

  setUserInfo() {
    const { user, sessions } = this.props;
    const stateSessions = this.state.sessions;
    const birthday = moment(user.birthday);
    this.setState({
      user: {
        ...user,
        birthday: birthday.isValid() ? birthday.locale('ru').format('DD.MM.YYYY').toString() : '',
        formattedDate: birthday.isValid() ? moment(user.birthday) : null
      }
    });
    if (sessions && stateSessions.length !== sessions.length) {
      this.setState({
        sessions: sessions
      });
    }
  }

  componentDidMount() {
    this.getUserInfo();
  }

  componentDidUpdate() {
    const { user, sessions } = this.props;
    const userState = this.state.user;
    const stateSessions = this.state.sessions;
    if (user && !userState._id) {
      const birthday = moment(user.birthday);
      this.setState({
        user: {
          ...user,
          birthday: birthday.isValid() ? birthday.locale('ru').format('DD.MM.YYYY').toString() : '',
          formattedDate: birthday.isValid() ? moment(user.birthday) : null
        }
      });
    }
    if (stateSessions && stateSessions.length === 0 || (sessions && stateSessions.length !== sessions.length)) {
      this.setState({
        sessions: sessions
      });
    }
  }

  async updateUserInfo() {
    const { updateUserInfo } = this.props;
    const { user } = this.state;
    let name = user.name ? user.name.trim() : '';
    if (!user.formattedDate.isValid() || name === '') {
      let message = name !== '' ? this.incorrectDateMessage : this.incorrectUsername;
      this.setState({
        message: {
          error: true,
          text: message
        }
      });
      return;
    }
    try {
      this.setState({
        btnDisabled: true,
        btnText: 'Сохранение...'
      });
      await updateUserInfo({
        ...user,
        name,
        birthday: user.formattedDate.format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z'
      });
      this.setState({
        user: { ...this.state.user, name: name },
        message: { error: true, text: this.successMessage, isSuccess: true },
        btnDisabled: false,
        btnText: 'Сохранить'
      });

    } catch (e) {
      this.setState({
        message: { error: true, text: this.serverError },
        btnDisabled: false,
        btnText: 'Сохранить'
      });
    }
  }

  async terminateUserSession(id) {
    const { terminateUserSession } = this.props;
    try {
      await terminateUserSession(id);
    } catch (e) {
      if (e.response && e.response.status === 403) {
        window.location.href = '/';
      }
      this.setState({
        message: {
          error: true,
          text: this.serverError
        }
      });
    }
  }

  setName(e) {
    this.setState({
      user: {
        ...this.state.user,
        name: e.target.value
      },
      message: {
        error: false,
        text: '',
        isSuccess: false
      }
    });
  }

  setUserBirthday(e) {
    const date = moment(e.target.value, 'DD.MM.YYYY');
    this.setState({
      user: {
        ...this.state.user,
        birthday: e.target.value,
        formattedDate: date
      },
      message: {
        error: false,
        text: '',
        isSuccess: false
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
          birthday: date.locale('ru').format('DD.MM.YYYY'),
          formattedDate: date
        },
        message: {
          error: false,
          text: message.text === this.incorrectDateMessage ? '' : message.text
        }
      });
    } else {
      this.setState({
        formattedDate: date
      });
    }
  }

  saveNewPhoto(photo) {
    this.setState({
      user: {
        ...this.state.user,
        photo: photo
      }
    });
  }

  toggleCalendar(e) {
    this.setState({
      calendarVisible: !this.state.calendarVisible
    });
  }

  getSessionsTemplate(sessions) {
    return (
      sessions.map(item => {
        return (
          <div className='col-xs-10 col-sm-9 col-md-8' key={item._id}>
            <UserSession os={item.os} type={item.type} browser={item.browser} id={item._id}
                         terminateSession={::this.terminateUserSession}/>
          </div>
        );
      }));
  }

  render() {
    const { sessions, user, calendarVisible, message, btnDisabled, btnText } = this.state;
    let sessionsList = sessions ? this.getSessionsTemplate(sessions) : null;
    return (
      <div className='profile-container col-xs-10 col-sm-10 col-md-10 col-lg-10'>
        <div className='row center-xs center-sm center-md'>
          <div className='col-xs-12 col-sm-12 col-md-12'>
            <h1 className='profile-container__header'>Настройки профиля</h1>
          </div>
          <ProfileInfo saveNewPhoto={::this.saveNewPhoto} photo={user.photo}/>
        </div>
        <div className='row center-xs center_sm center-md profile-container__input-name'>
          <div className='col-xs-9 col-sm-6 col-md-4'>
            <input
              className={
                `input
    ${message.text === this.incorrectUsername ? 'input--red' : 'input--blue'}
     profile-container__input-date`
              }
              type='text'
              placeholder='Введите имя'
              value={user.name} onChange={::this.setName}/>
          </div>
        </div>
        <div className='row center-xs center_sm center-md'>

          <div className='col-xs-9 col-sm-6 col-md-4'>

            <div className='input-container'>
              <input
                className={
                  `input
    ${message.text === this.incorrectDateMessage ? 'input--red' : 'input--blue'}
     profile-container__input-date`
                }
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
              {calendarVisible && <DatePicker toggleCalendar={::this.toggleCalendar} date={user.formattedDate || null}
                                              setDate={::this.setDate}/>}
            </div>
            <div className='col-xs-9 col-sm-6 col-md-4'>
              { <p className='message alert-message'>{ !message.isSuccess && message.text }</p> }
            </div>
          </div>
        </div>
        <div className='row center-md center-sm center-xs profile-container__btn'>
          <div className='col-xs-9 col-sm-6 col-md-4'>
            <button className={`btn btn-enter btn--greyblue btn-preload ${btnDisabled ? 'btn--disabled' : ''}`}
                    disabled={btnDisabled}
                    onClick={::this.updateUserInfo}>
              { btnDisabled ? <Loader /> : null }
              {btnText}
            </button>
            <div className="row">
              <div className='col-xs-9 col-sm-6 col-md-4'>
                {
                  <p className='message alert-message alert-message--success'>
                    { message.isSuccess && message.text }
                  </p>
                }
              </div>

            </div>
          </div>
        </div>

        <hr/>

        <div className='row center-xs center-sm center-md profile-container__sessions'>
          <div className='col-md-12 col-xs-12 col-sm-12'>
            <h1 className='profile-container__header'>Ваши сессии</h1>
          </div>
          {sessionsList}
        </div>
      </div>
    );
  }
}
