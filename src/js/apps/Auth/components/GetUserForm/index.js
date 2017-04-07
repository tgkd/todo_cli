import React, {Component} from 'react';

import 'flexboxgrid';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: false,
      errorText: '',
      apiError: {
        error: false,
        message: ''
      }
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
      this.setState({ error: true });
      return false;
    } else if (!this.isValidEmail(email)) {
      this.setState({ errorText: 'Введите действительный e-mail', error: true });
      return false;
    } else {
      return true;
    }
  }

  getUserClickHandler() {
    let { email } = this.state;

    if (this.isValidInput(email)) {
      this.setState({
        error: false,
        errorText: ''
      });
      this.props.getUserInfo(this.state.email)
    }
  }

  getInputClass() {
    let { error, apiError } = this.state;
    return `input ${error || apiError.error ? 'input--red' : 'input--blue'} email-container__input`
  }

  getAlertClass() {
    return `alert-ico ${this.state.error ? '' : 'alert-ico--hidden'}`
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.getUserClickHandler();
    }
  }

  componentDidMount() {
    this.emailInput.focus();
  }

  componentDidUpdate() {
    const { apiError } = this.props;
    if (apiError) {
      this.setState({
        apiError: {
          error: true,
          message: apiError
        }
      })
    }
  }

  render() {
    const { error, errorText, apiError } = this.state;

    return (
      <div className='email-container col-xs-4 col-sm-4 col-md-4'>
        <h1 className='email-container__header'>Войти в приложение</h1>
        <div className='row middle-md middle-sm middle-xs start-md start-sm start-xs'>
          <div className='col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2'>
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
            <div className={error || apiError.error ? '' : 'alert-container--hidden'}>
              <span className='alert-message'>{errorText || apiError.message}</span>
            </div>
          </div>
          <div className='col-md-1 col-sm-1 col-xs-1 email-container__alert'>
            <img className={::this.getAlertClass()} src='/assets/alert.svg' alt='alert'/>
          </div>
        </div>
        <div className='row middle-md middle-sm middle-xs'>
          <div className='col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-sm-offset-2 col-xs-offset-2'>
            <button className='btn btn-enter btn--greyblue'
                    disabled={!this.state.email}
                    onClick={::this.getUserClickHandler}>Продолжить
            </button>
          </div>
        </div>
      </div>
    )

  }
}