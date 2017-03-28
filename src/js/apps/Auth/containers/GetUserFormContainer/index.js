import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/login';

import GetUserForm from '../../components/GetUserForm';
import {Redirect} from "react-router-dom";

@connect(
  ({ user, triedToEnter }) => ({ user, triedToEnter }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getUser } = this.props;
    const { user, triedToEnter } = this.props.user;

    let content;
    if(!user && !triedToEnter) {
      content = <GetUserForm getUserInfo={getUser} />
    } else if(user && triedToEnter) {
      content = <Redirect to="/login" />
    } else {
      content = <Redirect to="/register" />
    }

    return content;
  }
}