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
        apiError: {
          error: true,
          message: errorText
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
    if (!this.isValidEmail(email.value)) this.setState({
      inputs: {
        ...inputs,
        email: {
          ...email,
          error: this.errorMessages.email
        }
      }
    });
    if (!this.isSamePasswords(confirmPassword.value)) this.setState({
      inputs: {
        ...inputs,
        confirmPassword: {
          ...confirmPassword,
          error: this.errorMessages.passDiff
        }
      }
    });
    if (!this.isRequiredPassLength(password.value)) this.setState({
      inputs: {
        ...inputs,
        password: {
          ...password,
          error: this.errorMessages.passLength
        }
      }
    });
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
          <span className="alert-message">{ error }</span>
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
      return (
        <div key={id} className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
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
          <div className="col-md-1 col-sm-1 col-xs-1 register-container__alert">
            <img className={::this.getAlertClass(input.name)} src="/assets/images/icons/alert.svg" alt="alert"/>
          </div>
        </div>
      );
    });
  }

  render() {
    const { btnDisabled, buttonText } = this.state;
    return (
      <div className="register-container col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="row">
          <div className="col-md-2 col-sm-2 col-xs-2">
            <Link to='/find_by_email'>
              <img src="/assets/images/icons/back-grey.svg" className="register-container__link" alt="exit"/>
            </Link>
          </div>
          <div className="col-md-8 col-sm-8 col-xs-8">
            <h1 className="register-container__header"> Регистрация e-mail</h1>
          </div>
        </div>
        { ::this.getInputsTemplate() }

        <div className="row middle-md middle-sm middle-xs start-md start-sm start-xs">
          <div className="col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1">
            <span className={`alert-message ${this.state.apiError.error ? '' : 'alert-container--hidden'}`}>
              { this.state.apiError.message }
            </span>
            { ::this.getErrorsList() }
          </div>
        </div>

        <div className="row middle-md middle-sm middle-xs">
          <div className="col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1">
            <button
              className="btn btn-enter btn--greyblue btn-preload"
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