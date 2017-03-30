import React, { Component } from 'react';
import 'flexboxgrid';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      error: ''
    };
  }

  onChangeHandler(e) {
    this.setState({
      password: e.target.value
    })
  }

  onClickHandler() {
    let credentials = {
      email: this.props.user.email,
      password: this.state.password
    };

    this.props.login(credentials, this.props.sessionInfo)
      .then(data => {
        window.location.href = '/';
      })
      .catch(error => {
        //new error
      });
  }

  render() {
    const user = this.props.user;
    return (
      <div className="login-container col-xs-6 col-sm-6 col-md-6">
        <img className="avatar" src={user.photo || './assets/unknown_photo.svg'} />
        <h1> Hi {user.name || 'unknown'} </h1>
        <input className="input-default" placeholder="Введите пароль" type="password" onChange={::this.onChangeHandler}/>
        <br/>
        <button className="btn-default btn-enter" onClick={::this.onClickHandler}>Войти</button>
      </div>
    )
  }
}