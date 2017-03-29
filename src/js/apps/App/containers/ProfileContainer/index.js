import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/user';

import Profile from '../../components/Profile';

@connect(
  ({ user }) => ({ user }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateUserInfo } = this.props;
    const { user, sessions } = this.props.user;

    return (
      <div>
        <h4>Profile container</h4>
        <Profile updateUserInfo={updateUserInfo} user={user} sessions={sessions}/>
      </div>
    )
  }
}