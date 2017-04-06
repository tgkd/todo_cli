import React, {Component} from 'react';
import 'flexboxgrid';

import Auth from '../../../../libs/auth';
import {Link} from "react-router-dom";

export default class extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth();
    this.state = {
      apiError: {
        error: false,
        message: ''
      },
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      },
      confirmPassword: {
        value: '',
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
    return this.isValidEmail(email.value) && this.isSamePasswords(confirmPassword.value) && this.isRequiredPassLength(password.value);
  }

  inputChangeHandler(inputName, value) {
    this.setState({[inputName]: {value}});
  }

  isNotEmptyInputs() {
    const {email, password, confirmPassword} = this.state;
    return email.value.length && password.value.length && confirmPassword.value.length;
  }

  setErrorText() {
    const {email, password, confirmPassword} = this.state;
    if(!this.isValidEmail(email.value)) this.setState({email: {...email, error: this.errorMessages.email}});
    if(!this.isSamePasswords(confirmPassword.value)) this.setState({confirmPassword: {...confirmPassword, error: this.errorMessages.passDiff}});
    if(!this.isRequiredPassLength(password.value)) this.setState({password: {...password, error: this.errorMessages.passLength}});
  }

  submitClickHandler() {
    let credentials = {
      email: this.state.email.value,
      password: this.state.password.value
    };
    if (this.isValidInputs() && this.isNotEmptyInputs()) {
      this.props.register(credentials);
    } else {
      this.setErrorText();
    }
  }

  getInputClass(inputName) {
    const error = this.state[inputName].error;
    return `input ${error ? 'input--red' : 'input--blue'} register-container__input`;
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

  componentDidUpdate() {
    const { apiError } = this.props;
    if(apiError) {
      this.setState({
        apiError: {
          error: true,
          message: apiError
        }
      })
    }
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitClickHandler();
    }
  }

  componentDidMount() {
    this.emailInput.focus();
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
              value={this.state[input.name].value}
              ref={input.name === 'email' ? (input) => {
                this.emailInput = input;
              } : null}
              onKeyPress={::this.onKeyPress}
            />
          </div>
          <div className="col-md-1 col-sm-1 col-xs-1 register-container__alert">
            <img className={::this.getAlertClass(input.name)} src="/assets/alert.svg" alt="alert"/>
          </div>
        </div>
      )
    });

    const errorsList = this.getErrorsList();
    return (
      <div className="register-container col-xs-4 col-sm-4 col-md-4">
        <div className="row">
          <div className="col-md-2 col-sm-2 col-xs-2">
            <Link to='/find_by_email'>
              <img src="/assets/back-grey.svg" className="register-container__link" alt="exit"/>
            </Link>
          </div>
          <div className="col-md-8 col-sm-8 col-xs-8">
            <h1 className="register-container__header"> Регистрация e-mail</h1>
          </div>
        </div>
        {inputList}

        <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
          <div className="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
            <div className={ this.state.apiError.error ? '' : "alert-container--hidden"}>
              <span className="alert-message">{ this.state.apiError.message}</span>
            </div>
            {errorsList}
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