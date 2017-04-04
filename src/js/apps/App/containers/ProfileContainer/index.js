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
    this.state = {
      error: ''
    }
  }

  updateUserInfo(userInfo) {
    const { updateUserInfo } = this.props;
    updateUserInfo(userInfo)
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }

  terminateUserSession() {
    const { terminateSession } = this.props;
    terminateSession(id);
  }

  render() {

    const { user, sessions } = this.props.user;

    return (
      <div>
        <Navigation/>
        <div className="row center-xs center-md center-md">
          <Profile
            apiError={this.state.error}
            updateUserInfo={::this.updateUserInfo}
            termianteUserSession={::this.terminateUserSession}
            user={user}
            sessions={sessions}/>
        </div>
      </div>

    )
  }
}