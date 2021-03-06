import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/user';

import Profile from '../../components/Profile';
import Navigation from '../../components/Navigation';

@connect(
  ({ user }) => ({ user }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { user, sessions } = this.props.user;
    const { getUserInfo, updateUserInfo, logout, terminateSession } = this.props;

    return (
      <div className="pagecontent">
        <Navigation logout={logout}/>
        <div className='row center-xs'>
          <Profile
            getUserInfo={getUserInfo}
            updateUserInfo={updateUserInfo}
            terminateUserSession={terminateSession}
            user={user}
            sessions={sessions}/>
        </div>
      </div>

    );
  }
}