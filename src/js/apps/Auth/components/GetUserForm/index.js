import React, { Component } from 'react';
import 'flexboxgrid';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: '',
      placeholder: 'Введите email',
      disabledBtn: true
    };
  }

  validateEmail(email)
  {
    let reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  }

  onChangeHandler(e) {

    if (!this.validateEmail(e.target.value)){
      this.setState({
        error: 'Введите действительный email'
      })
    } else {
      this.setState({
        error: '',
        email: e.target.value,
        disabledBtn: false
      })
    }
  }

  onClickHandler() {
    let {email} = this.state;
    if(!email) {
      this.setState({
        placeholder: 'Заполните поле',
        disabledBtn: true
      });
    } else {
      this.props.getUserInfo(this.state.email);
    }
  }

  getAlertClass() {
    return `${this.state.error ? '' : 'hide'} alert-ico`
  }

  render() {
    let {error, placeholder, disabledBtn, email} = this.state;
    return (
      <div className="email-container col-xs-6 col-sm-6 col-md-6 ">
        <h1>Войти в приложение</h1>
        <div className="row center-md center-sm center-xs middle-md middle-sm middle-xs">
          <div className="col-md- col-sm-12 col-xs-12">
            <input className={disabledBtn && error ? 'input-alert' : 'input-default'} type="text" placeholder={ placeholder } onChange={::this.onChangeHandler}/>
            <img className={::this.getAlertClass()} src="./assets/alert.svg" alt="alert"/>
          </div>
          <span className="alert-message">{error}</span>
        </div>
        <br/>
        <button className="btn-default btn-enter" disabled={disabledBtn} onClick={::this.onClickHandler}>Продолжить</button>
      </div>
    )
  }
}