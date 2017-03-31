import React, {Component} from 'react';
import 'flexboxgrid';

import Auth from '../../../../libs/auth';
import {Link} from "react-router-dom";

export default class extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth();
    this.state = {
      email: {
        value: '',
        touched: false,
        error: ''
      },
      password: {
        value: '',
        touched: false,
        error: ''
      },
      confirmPassword: {
        value: '',
        touched: false,
        error: ''
      }
    };
    this.errorMessages = {
      email: 'Введите действительный email',
      passDiff: 'Пароли не совдпадают',
      passLength: 'Длина пароля не менее 6 символов',

    };
    this.inputs = [
      {
        name: 'email',
        type: 'text',
        placeholder: 'Введите email'
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Задайте пароль'
      },
      {
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Повторите пароль'
      }
    ]
  }

  isValidEmail(email) {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  }

  isSamePasswords(confirmPassword) {
    const { password } = this.state;
    return password.value === confirmPassword;
  }

  isRequiredPassLength(password){
    return password.length >= 6;
  }

  isValidInputs() {
    const {email, confirmPassword, password} = this.state;
    console.log(this.isValidEmail(email.value) && this.isSamePasswords(confirmPassword.value) && this.isRequiredPassLength(password.value));
    return this.isValidEmail(email.value) && this.isSamePasswords(confirmPassword.value) && this.isRequiredPassLength(password.value);
  }

  inputChangeHandler(inputName, value) {
    switch (inputName) {
      case 'email':
        if (this.isValidEmail(value)) {
          this.setState({email: {error: '', value, touched: true}})
        } else {
          this.setState({email: {value: '', touched: true, error: this.errorMessages.email}});
        }
        return;
      case 'password':
        if(this.isRequiredPassLength(value)){
					this.setState({password: {error: '', value, touched: true}});
        } else {
	        this.setState({password: {value: '', touched: true, error: this.errorMessages.passLength}});
        }

        return;
      case 'confirmPassword':
        if (this.isSamePasswords(value)) {
          this.setState({confirmPassword: {error: '', value, touched: true}})
        } else {
          this.setState({confirmPassword: {value: '', touched: true, error: this.errorMessages.passDiff}});
        }
        return;
    }
  }

  isNotEmptyInputs() {
    const {email, password, confirmPassword} = this.state;
    return email.value.length && password.value.length && confirmPassword.value.length;
  }

  submitClickHandler() {
    let credentials = {
      email: this.state.email.value,
      password: this.state.password.value
    };
    if (this.isValidInputs() && this.isNotEmptyInputs()) {
      this.auth.register(credentials, this.props.sessionInfo)
        .then(data => {
          window.location.href = '/';
        })
        .catch(error => {
          this.setState({
            email: {
              ...this.state.email,
              error: error.message
            },
            password: {
              ...this.state.password,
              value: ''
            },
            confirmPassword: {
              ...this.state.confirmPassword,
              value: ''
            }
          })
        });
    }
  }

  getInputClass(inputName) {
    const touched = this.state[inputName].touched;
    const error = this.state[inputName].error;
    return `input ${touched && error ? 'input--red' : 'input--blue'} register-container__input`;
  }

  getAlertClass(inputName) {
    const error = this.state[inputName].error;
    return `alert-ico ${error ? '' : 'alert-ico--hidden'}`;
  }

  getErrorsList() {
    return Object.keys(this.state).map(item => {
      return(
        <div className={ this.state[item].error ? '' : "alert-container--hidden"}>
          <span className="alert-message">{ this.state[item].error }</span>
          <br/>
        </div>
      )
    })
  }

  render() {
    const inputList = this.inputs.map((input, id) => {
      return (
        <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
            <input
              className={::this.getInputClass(input.name)}
              key={id}
              type={input.type}
              onChange={(e) => ::this.inputChangeHandler(input.name, e.target.value)}
              placeholder={input.placeholder}
              name={input.name}
            />
          </div>
          <div className="col-md-1 col-sm-1 col-xs-1 register-container__alert">
            <img className={::this.getAlertClass(input.name)} src="/assets/alert.svg" alt="alert"/>
          </div>
        </div>
      )
    });

    const errorsList = this.getErrorsList();
    const disabled = !this.isValidInputs();
    return (
      <div className="register-container col-xs-6 col-sm-6 col-md-6">
        <div className="row middle-md middle-sm middle-xs">
          <div className="col-md-2 col-sm-2 col-xs-2">
            <Link to='/find_by_email'>back</Link>
          </div>
          <div className="col-md-8 col-sm-8 col-xs-8">
            <h1 className="register-container__header"> Регистрация e-mail</h1>
          </div>
        </div>
        {inputList}

        <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
            {errorsList}
          </div>
        </div>

        <div className="row middle-md middle-sm middle-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
            <button
              className="btn btn-enter btn--greyblue"
              disabled={disabled}
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