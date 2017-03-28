import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onChangePassHandler(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeEmailHandler(e) {
    this.setState({
      email: e.target.value
    })
  }

  onClickHandler() {
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.register(credentials, this.props.sessionInfo);
  }


  render() {
    const error = this.props.error ? this.props.error.message : '';
    return (
      <div>
        <label htmlFor="email">Email</label>
        <input name="email" type="text" onChange={::this.onChangeEmailHandler}/>
        <br/>
        <label htmlFor="pass">Pass</label>
        <input name="pass" type="password" onChange={::this.onChangePassHandler}/>
        <br/>
        <button onClick={::this.onClickHandler}>click</button>
      </div>
    )
  }
}