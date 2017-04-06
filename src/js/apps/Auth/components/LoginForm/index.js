import React, {Component} from 'react';
import 'flexboxgrid';

import Auth from '../../../../libs/auth';
import {Link} from "react-router-dom";

export default class extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.state = {
      password: '',
      error: false,
      errorText: '',
      user: this.props.user
    };
  }

  inputChangeHandler(e) {
    this.setState({
      password: e.target.value
    })
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
      })
    } else {
      this.props.login(credentials);
    }
  }

  getInputClass() {
    let { error } = this.state;
    return `input ${error ? 'input--red' : 'input--blue'} email-container__input`;
  }

  getAlertClass() {
    return `alert-ico ${this.state.error ? '' : 'alert-ico--hidden'}`;
  }

  componentDidUpdate() {
    const { apiError } = this.props;
    if (apiError) {
      this.setState({
        password: '',
        error: true,
        errorText: apiError
      })
    }
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
    const user = this.state.user;
    const { password, errorText } = this.state;
    return (
      <div className="login-container col-xs-4 col-sm-4 col-md-4">
        <div className="row">
          <div className="col-md-2 col-sm-2 col-xs-2">
            <Link to='/find_by_email'>
              <img src="/assets/back-grey.svg" className="login-container__link" alt="exit"/>
            </Link>
          </div>
          <div className="col-md-8 col-sm-8 col-xs-8">
            <img className="login-container__avatar" src={user.photo || '/assets/unknown.svg'}/>
            <h1 className="login-container__header"> Hi, {user.name || 'unknown'} </h1>
          </div>
        </div>

        <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
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
            <img className={::this.getAlertClass()} src="/assets/alert.svg" alt="alert"/>
          </div>
        </div>

        <div className="row middle-md middle-sm middle-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
            <button
              className="btn btn-enter btn--greyblue"
              onClick={::this.submitClickHandler}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    )
  }
}