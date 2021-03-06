import React, {Component} from 'react';
import Loader from 'components/Loader';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: false,
      errorText: '',
      buttonText: 'Продолжить',
      btnDisabled: false
    };
  }

  isValidEmail(email) {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  }

  inputChangeHandler(e) {
    this.setState({
      email: e.target.value,
      error: false,
      errorText: ''
    });
  }

  isValidInput(email) {
    email = email.trim();
    if (!email || !this.isValidEmail(email)) {
      this.setState({ errorText: 'Введите действительный e-mail', error: true });
      return false;
    } else {
      return true;
    }
  }

  async getUser() {
    const { goTo, getUser } = this.props;
    let { email } = this.state;

    if (this.isValidInput(email)) {
      this.setState({
        error: false,
        errorText: '',
        buttonText: 'Вход...',
        btnDisabled: true
      });
      try {
        await getUser(email.trim());
        if (this.props.user.email) {
          goTo('/login');
        }
      } catch (e) {
        if (e.response && e.response.status === 400) {
          goTo('/register');
          return;
        }
        this.setState({
          error: true,
          errorText: 'Ошибка, повторите попытку',
          buttonText: 'Продолжить',
          btnDisabled: false
        });
      }
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
      this.getUser();
    }
  }

  componentDidMount() {
    if (this.emailInput) {
      this.emailInput.focus();
    }
  }

  render() {
    const { error, errorText, btnDisabled, buttonText } = this.state;

    return (
      <div className='email-container col-xs-4'>
        <h1 className='email-container__header'>Войти в приложение</h1>
        <div className='row middle-xs start-xs'>
          <div className='col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1'>
            <input
              className={::this.getInputClass()}
              type='text'
              placeholder='Введите email'
              onChange={::this.inputChangeHandler}
              value={this.state.email}
              ref={(input) => {
                this.emailInput = input;
              }}
              onKeyPress={::this.onKeyPress}
            />
            <div className='email-container__alert col-md-8 col-sm-8 col-xs-10'>
              { <p className='message alert-message'>{ error && errorText }</p> }
            </div>
          </div>
          <div className='col-xs-1 email-container__alert'>
            <img className={::this.getAlertClass()} src='/assets/images/icons/alert.svg' alt='alert'/>
          </div>
        </div>
        <div className='row middle-xs'>
          <div className='col-md-8 col-sm-8 col-xs-10 col-md-offset-2 col-sm-offset-2 col-xs-offset-1'>
            <button
              className={`btn btn-enter btn--greyblue email-container__btn btn-preload ${btnDisabled ? 'btn--disabled' : ''}`}
              disabled={ btnDisabled }
              onClick={::this.getUser}>
              { btnDisabled ? <Loader /> : null }
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    );

  }
}