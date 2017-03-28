import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/login';
import sessionInfo from '../../../../libs/session';

import RegisterForm from '../../components/RegisterForm';

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
    const { register } = this.props;
    const user  = this.props.user;
    const error = !user.error ? '' : user.error.message;
    return (
      <div>
        <h4>Register form container</h4>
        <RegisterForm register={register} error={user ? user.error : ''} sessionInfo={this.sessionInfo}/>
        <p>{error} </p>
      </div>
    )
  }
}