import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/login';
import sessionInfo from '../../../../libs/session';
import {Redirect} from "react-router-dom";

import LoginForm from '../../components/LoginForm';
import 'flexboxgrid';

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

    if(user && user.email) {
      return(
        <div className="row center-xs center-md center-md">
          <LoginForm login={login} user={user} sessionInfo={this.sessionInfo}/>
        </div>
      );
    } else {
      return <Redirect to="/find_by_email" />
    }
  }
}