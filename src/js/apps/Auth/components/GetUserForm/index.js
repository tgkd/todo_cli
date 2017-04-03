import React, {Component} from 'react';
import {Redirect} from "react-router";

import 'flexboxgrid';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: '',
      redirect: false
    };
  }

  isValidEmail(email) {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  }

  inputChangeHandler(e) {
    this.setState({
      email: e.target.value
    })
  }

  isValidInput(email) {
    if (!email) {
      this.setState({error: 'Введите e-mail'});
      return false;
    } else if (!this.isValidEmail(email)) {
      this.setState({error: 'Введите действительный e-mail'});
      return false;
    } else {
      return true;
    }
  }

  getUserClickHandler() {
    let {email} = this.state;

    if (this.isValidInput(email)) {
      this.props.getUserInfo(this.state.email);
    }
  }

  getInputClass() {
    let {touched, disabledBtn, error} = this.state;
    return `input ${touched && (disabledBtn || error) ? 'input--red' : 'input--blue'} email-container__input`
  }

  getAlertClass() {
    return `alert-ico ${this.state.error ? '' : 'alert-ico--hidden'}`
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    let {error, disabledBtn, redirect} = this.state;

    if (redirect) {
      return <Redirect to="/login"/>
    } else {

      return (
        <div className="email-container col-xs-6 col-sm-6 col-md-6 ">
          <h1 className="email-container__header">Войти в приложение</h1>
          <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
            <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
              <input className={::this.getInputClass()} type="text" placeholder='Введите email'
                     onChange={::this.inputChangeHandler}/>
              <div className={error ? '' : 'alert-container--hidden'}>
                <span className="alert-message">{error}</span>
              </div>
            </div>
            <div className="col-md-1 col-sm-1 col-xs-1 email-container__alert">
              <img className={::this.getAlertClass()} src="/assets/alert.svg" alt="alert"/>
            </div>
          </div>
          <div className="row middle-md middle-sm middle-xs">
            <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
              <button className="btn btn-enter btn--greyblue" disabled={disabledBtn}
                      onClick={::this.getUserClickHandler}>Продолжить
              </button>
            </div>
          </div>
        </div>
      )
    }
  }
}