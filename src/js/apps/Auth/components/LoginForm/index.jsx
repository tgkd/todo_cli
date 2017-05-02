import React, {Component} from 'react';
import Auth from 'libs/auth';
import {Link} from "react-router-dom";
import Loader from 'components/Loader';

export default class extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.state = {
      password: '',
      error: false,
      errorText: '',
      buttonText: 'Войти',
      btnDisabled: false
    };

    const host = PRODUCTION ? window.location.origin : 'http://localhost:3001/';
    this.defaultAvatar = host + 'assets/images/profile/unknown.svg';
  }

  async login(credentials) {
    const { login, sessionInfo } = this.props;
    try {
      await login(credentials, sessionInfo);
      window.location.href = '/';
    } catch (e) {
      const error = { error: true, buttonText: 'Войти', btnDisabled: false };
      if (e.response && e.response.status === 400) {
        error.errorText = 'Неверный пароль';
        error.password = '';
      } else {
        error.errorText = 'Ошибка, повторите попытку';
      }
      this.setState({ ...error });
    }
  }

  inputChangeHandler(e) {
    this.setState({
      password: e.target.value
    });
  }

  submitClickHandler() {
    let credentials = {
      email: this.props.user.email,
      password: this.state.password
    };
    if (!this.state.password) {
      this.setState({
        error: true,
        errorText: 'Введите пароль'
      });
    } else {
      this.setState({
        buttonText: 'Вход...',
        btnDisabled: true
      });
      this.login(credentials);
    }
  }

  getInputClass() {
    let { error } = this.state;
    return `input ${error ? 'input--red' : 'input--blue'} email-container__input`;
  }

  getAlertClass() {
    return `alert-ico ${this.state.error ? '' : 'alert-ico--hidden'}`;
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitClickHandler();
    }
  }

  componentDidMount() {
    this.passwordInput.focus();
  }

  render() {
    const user = this.props.user;
    const { password, errorText, btnDisabled } = this.state;
    const imageStyle = {
      backgroundImage: !user.photo ? `url(${this.defaultAvatar})` : `url(${user.photo})`
    };
    return (
      <div className="login-container col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="row">
          <div className="col-md-2 col-sm-2 col-xs-2">
            <Link to='/find_by_email'>
              <img src="/assets/images/icons/back-grey.svg" className="login-container__link" alt="exit"/>
            </Link>
          </div>
          <div className="col-md-8 col-sm-8 col-xs-8">
            <div className="row center-md center-sm center-xs">
              <div className="col-xs-12 col-sm-12 col-md-12 avatar-container">
                <div className="profile-container__avatar" style={imageStyle}/>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <h1 className="login-container__header"> Hi, {user.name ? user.name : 'unknown'} </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
          <div className="col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1">
            <input
              className={::this.getInputClass()}
              placeholder={errorText || "Введите пароль"}
              type="password"
              value={password}
              onChange={::this.inputChangeHandler}
              ref={(input) => {
                this.passwordInput = input;
              }}
              onKeyPress={::this.onKeyPress}
            />
          </div>
          <div className="col-md-1 col-sm-1 col-xs-1 login-container__alert">
            <img className={::this.getAlertClass()} src="/assets/images/icons/alert.svg" alt="alert"/>
          </div>
        </div>

        <div className="row middle-md middle-sm middle-xs">
          <div className="col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1">
            <button
              className="btn btn-enter btn--greyblue btn-preload"
              onClick={::this.submitClickHandler}
              disabled={!this.state.password || this.state.btnDisabled}
            >
              { btnDisabled ? <Loader /> : null }
              {this.state.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}