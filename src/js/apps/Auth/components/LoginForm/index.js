import React, {Component} from 'react';
import 'flexboxgrid';

import Auth from '../../../../libs/auth';
import {Link} from "react-router-dom";

export default class extends Component {
  constructor(props) {
    super(props);
    /*todo wtf*/
    //напрямую используем методы запросов к апи? или получать из this.state?
    this.auth = new Auth();
    this.state = {
      password: '',
      error: '',
      disabledBtn: true,
      user: this.props.user,
      touched: false
    };
  }

  inputChangeHandler(e) {
    this.setState({
      password: e.target.value,
      disabledBtn: false,
      touched: true
    })
  }

  submitClickHandler() {
    if (!this.state.password) {
      this.setState({
        disabledBtn: true
      })
    } else {
      let credentials = {
        email: this.props.user.email,
        password: this.state.password
      };

      this.auth.login(credentials, this.props.sessionInfo)
        .then(data => {
          window.location.href = '/';
        })
        .catch(error => {
          //todo если ошибка === 500 то куда писать сообщение?
          let errMessage = error.response.status === 400 ? 'Неверный пароль' : '';
          this.setState({
            error: errMessage,
            password: ''
          });
        });
    }
  }

  getInputClass() {
    let {touched, disabledBtn, error} = this.state;
    return `input ${touched && (disabledBtn || error) ? 'input--red' : 'input--blue'} email-container__input`;
  }

  getAlertClass() {
    return `alert-ico ${this.state.error ? '' : 'alert-ico--hidden'}`;
  }

  render() {
    const user = this.state.user;
    const {disabledBtn, password, error} = this.state;
    return (
      <div className="login-container col-xs-6 col-sm-6 col-md-6">
        <div className="row middle-md middle-sm middle-xs">
          <div className="col-md-2 col-sm-2 col-xs-2">
            <Link to='/find_by_email'>back</Link>
          </div>
          <div className="col-md-8 col-sm-8 col-xs-8">
            <img className="login-container__avatar" src={user.photo || '/assets/unknown.svg'}/>
            <h1 className="login-container__header"> Hi, {user.name || 'unknown'} </h1>
          </div>
        </div>

        <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
            <input className={::this.getInputClass()} placeholder={error || "Введите пароль"} type="password"
                   value={password} onChange={::this.inputChangeHandler}/>
          </div>
          <div className="col-md-1 col-sm-1 col-xs-1 login-container__alert">
            <img className={::this.getAlertClass()} src="/assets/alert.svg" alt="alert"/>
          </div>
        </div>

        <div className="row middle-md middle-sm middle-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
            <button
              className="btn btn-enter btn--greyblue"
              disabled={disabledBtn || !password}
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