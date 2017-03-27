import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/login';

import GetUserForm from '../../components/GetUserForm';

@connect(
  ({ user }) => ({ user }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getUser } = this.props;
    return <GetUserForm getUserInfo={getUser} />
  }
}