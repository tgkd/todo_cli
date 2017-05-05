import React, {Component} from 'react';
import Loader from 'components/Loader';
import Auth from 'libs/auth';
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
      buttonText: 'Войти',
      btnDisabled: false,
      inputs: {
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
    ];
  }

  async register(credentials) {
    const { register, sessionInfo } = this.props;
    try {
      await register(credentials, sessionInfo);
      window.location.href = '/';
    } catch (e) {
      let errorText = e.response && e.response.status === 400
        ? 'Пользователь с таким e-mail уже существует'
        : 'Ошибка, повторите попытку';
      this.setState({
        buttonText: 'Войти',
        btnDisabled: false,
        inputs: {
          ...this.state.inputs,
          email: {
            error: true,
            message: errorText
          }
        }
      });
    }
  }

  isValidEmail(email) {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  }

  isSamePasswords(confirmPassword) {
    const { password } = this.state.inputs;
    return password.value === confirmPassword;
  }

  isRequiredPassLength(password) {
    return password.length >= 6;
  }

  isValidInputs() {
    const { email, confirmPassword, password } = this.state.inputs;
    return this.isValidEmail(email.value) && this.isSamePasswords(confirmPassword.value) && this.isRequiredPassLength(password.value);
  }

  inputChangeHandler(inputName, value) {
    const input = { [inputName]: { value } };
    this.setState({ inputs: { ...this.state.inputs, ...input } });
  }

  isNotEmptyInputs() {
    const { email, password, confirmPassword } = this.state.inputs;
    return email.value.length && password.value.length && confirmPassword.value.length;
  }

  setErrorText() {
    const { email, password, confirmPassword } = this.state.inputs;
    const { inputs } = this.state;
    if (!this.isValidEmail(email.value)) {
      this.setState({
        inputs: {
          ...inputs,
          email: { ...email, error: this.errorMessages.email }
        }
      });
      return;
    }
    if (!this.isSamePasswords(confirmPassword.value)) {
      this.setState({
        inputs: {
          ...inputs,
          confirmPassword: { ...confirmPassword, error: this.errorMessages.passDiff }
        }
      });
      return;
    }
    if (!this.isRequiredPassLength(password.value)) {
      this.setState({
        inputs: {
          ...inputs,
          password: { ...password, error: this.errorMessages.passLength }
        }
      });
    }
  }

  submitClickHandler() {
    const { email, password } = this.state.inputs;
    let credentials = {
      email: email.value,
      password: password.value
    };
    if (this.isValidInputs() && this.isNotEmptyInputs()) {
      this.setState({
        apiError: {
          error: false,
          message: ''
        },
        buttonText: 'Регистрация...',
        btnDisabled: true
      });
      this.register(credentials);
    } else {
      this.setErrorText();
    }
  }

  getInputClass(inputName) {
    const error = this.state.inputs[inputName].error;
    return `input ${error ? 'input--red' : 'input--blue'} register-container__input`;
  }

  getAlertClass(inputName) {
    const error = this.state.inputs[inputName].error;
    return `alert-ico ${error ? '' : 'alert-ico--hidden'}`;
  }

  getErrorsList() {
    return Object.keys(this.state.inputs).map((item, id) => {
      const error = this.state.inputs[item].error;
      return (
        <div key={id} className={ error ? '' : "alert-container--hidden"}>
          <span className="message alert-message">{ error }</span>
          <br/>
        </div>
      );
    });
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitClickHandler();
    }
  }

  componentDidMount() {
    this.emailInput.focus();
  }

  getInputsTemplate() {
    return this.inputs.map((input, id) => {
      const error = this.state.inputs[input.name].error;
      return (
        <div>
          <div key={id} className="row middle-xs start-xs">
            <div className="col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1">
              <input
                className={::this.getInputClass(input.name)}
                type={input.type}
                onChange={(e) => ::this.inputChangeHandler(input.name, e.target.value)}
                placeholder={input.placeholder}
                name={input.name}
                value={this.state.inputs[input.name].value}
                ref={input.name === 'email' ? (input) => {
                  this.emailInput = input;
                } : null}
                onKeyPress={::this.onKeyPress}
              />
            </div>
            <div className="col-xs-1">
              <img className={::this.getAlertClass(input.name)} src="/assets/images/icons/alert.svg" alt="alert"/>
            </div>
          </div>
          <div className="row middle-xs start-xs register-container__alert">
            <div className="col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1">
              <div key={id} className={ "alert-container"}>
                <span className="message alert-message">{ error }</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { btnDisabled, buttonText } = this.state;
    return (
      <div className="register-container col-xs-4">
        <div className="row">
          <div className="col-xs-2">
            <Link to='/find_by_email'>
              <img src="/assets/images/icons/back-grey.svg" className="register-container__link" alt="exit"/>
            </Link>
          </div>
          <div className="col-xs-8">
            <h1 className="register-container__header"> Регистрация e-mail</h1>
          </div>
        </div>
        { ::this.getInputsTemplate() }

        <div className="row middle-xs">
          <div className="col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1">
            <button
              className={`btn btn-enter btn--greyblue register-container__btn btn-preload ${btnDisabled ? 'btn--disabled' : ''}`}
              disabled={btnDisabled}
              onClick={ ::this.submitClickHandler }>
              { btnDisabled ? <Loader /> : null }
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}