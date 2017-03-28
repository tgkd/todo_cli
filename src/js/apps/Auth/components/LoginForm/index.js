import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ''
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

    this.props.login(credentials, this.props.sessionInfo);
  }

  render() {
    const user = this.props.user;
    return (
      <div>

        <p>photo: <img src={user.photo || ''} /></p>
        <p>user: {user.name || 'unknown'} </p>
        <p>email: {user.email} </p>
        <p>Password</p>
        <input name="pass" type="password" onChange={::this.onChangeHandler}/>
        <br/>
        <button onClick={::this.onClickHandler}>click</button>
      </div>
    )
  }
}