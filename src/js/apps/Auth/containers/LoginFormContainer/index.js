import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/login';
import sessionInfo from '../../../../libs/session';

import LoginForm from '../../components/LoginForm';

@connect(
  ({ user }) => ({ user }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
    this.sessionInfo = sessionInfo();
  }

  render() {
    const { login } = this.props;
    const { user } = this.props.user;

    return (
      <div>
        <h4>Login form container</h4>
        <LoginForm login={login} user={user} sessionInfo={this.sessionInfo}/>
      </div>
    )
  }
}