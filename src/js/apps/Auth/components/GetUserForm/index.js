import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }

  onChangeHandler(e) {
    this.setState({
      email: e.target.value
    })
  }

  onClickHandler() {
    this.props.getUserInfo(this.state.email);
  }

  render() {
    return (
      <div>
        <h4>Enter email</h4>
        <input type="text" onChange={::this.onChangeHandler}/>
        <br/>
        <button onClick={::this.onClickHandler}>click</button>
      </div>
    )
  }
}