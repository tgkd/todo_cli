import React, {Component} from 'react';
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
        photo: ''
      },
      calendarVisible: false,
      sessions: this.props.sessions
    }
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({
        user: {
          name: user ? user.name : '',
          birthday: user ? user.birthday : '',
          photo: user ? user.photo : ''
        }
      })
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

  setDate(date) {
    this.setState({
      calendarVisible: false,
      user: {
        ...this.state.user,
        birthday: date
      }
    })
  }

  saveHandler() {
    this.props.updateUserInfo(this.state.user);
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
    this.props.terminateUserSession(id);
  }

  showCalendar() {
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
          <div className="col-xs-8 col-sm-8 col-md-8" key={item._id}>
            <UserSession os={item.os} type={item.type} browser={item.browser} id={item._id}
                         terminateSession={::this.terminateSession}/>
          </div>
        )
      })
    }
    return (
      <div className="profile-container col-xs-10 col-sm-10 col-md-10">
        <div className="row center-xs center-sm center-md">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <h1 className="profile-container__header">Настройки профиля</h1>
          </div>
          <ProfileInfo handleFile={::this.handleFile} photo={user.photo}/>
        </div>
        <div className="row center-xs center_sm center-md">
          <div className="col-xs-4 col-sm-4 col-md-4">
            <input className="input input--blue profile-container__input-name" type="text" placeholder="Введите имя"
                   value={user.name} onChange={::this.setName}/>
          </div>
        </div>
        <div className="row center-xs center_sm center-md">
          <div className="col-xs-4 col-sm-4 col-md-4">
            <input className="input input--blue profile-container__input-date"
                   type="text"
                   placeholder="Введите дату рождения"
                   value={user.birthday}/>
            <img src="/assets/little-calendar.svg" alt="calendar" onClick={::this.showCalendar}/>
            {
              calendarVisible && <DatePicker date={user.birthday} setDate={::this.setDate}/>
            }

          </div>
        </div>
        <div className="row center-md center-sm center-xs">
          <div className="col-xs-4 col-sm-4 col-md-4">
            <button className="btn btn-enter btn--greyblue" onClick={::this.saveHandler}>Сохранить</button>
          </div>
        </div>
        <hr/>

        <div className="row center-xs center-sm center-md">
          <div className="col-md-12 col-xs-12 col-sm-12">
            <h1 className="profile-container__header">Ваши сессии</h1>
          </div>
          {sessionsList}

        </div>

      </div>
    )
  }
}
