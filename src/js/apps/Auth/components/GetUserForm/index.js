import React, { Component } from 'react';
import 'flexboxgrid';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: '',
      touched: false,
      disabledBtn: true
    };
  }

  isValidEmail(email)
  {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  }

  inputChangeHandler(e) {
    if (!this.isValidEmail(e.target.value)){
      this.setState({
        error: 'Введите действительный email',
        touched: true,
        disabledBtn: false
      })
    } else {
      this.setState({
        touched: true,
        error: '',
        email: e.target.value,
        disabledBtn: false
      })
    }
  }

  getUserClickHandler() {
    let {email} = this.state;
    if(!email) {
      this.setState({
        disabledBtn: true
      });
    } else {
      this.props.getUserInfo(this.state.email);
    }
  }

  getInputClass() {
    let { touched, disabledBtn, error }  = this.state;
    return `input ${touched && (disabledBtn || error) ? 'input--red' : 'input--blue'} email-container__input`
  }

  getAlertClass() {
    return `alert-ico ${this.state.error ? '' : 'alert-ico--hidden'}`
  }

  render() {
    let {error, disabledBtn} = this.state;
    return (
      <div className="email-container col-xs-6 col-sm-6 col-md-6 ">
        <h1 className="email-container__header">Войти в приложение</h1>

        <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
            <input className={::this.getInputClass()} type="text" placeholder='Введите email' onChange={::this.inputChangeHandler}/>
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
            <button className="btn btn-enter btn--greyblue" disabled={disabledBtn} onClick={::this.getUserClickHandler}>Продолжить</button>
          </div>
        </div>
      </div>
    )
  }
}