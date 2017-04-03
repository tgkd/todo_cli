import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/login';

import GetUserForm from '../../components/GetUserForm';

import 'flexboxgrid';

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
    const {user} = this.props.user;

    return(
      <div className="row center-sm center-xs center-md">
        <GetUserForm user={user} getUserInfo={getUser} />
      </div>
    );
  }
}