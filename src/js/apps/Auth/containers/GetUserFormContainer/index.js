import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/';
import GetUserForm from '../../components/GetUserForm';

import 'flexboxgrid';


@connect(
  ({ user }) => ({ user }),
  (dispatch) => bindActionCreators({ ...actions.login,  ...actions.router}, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  render() {
    const {user} = this.props.user;
    const { goTo, getUser } = this.props;

    return(
      <div className="row center-sm center-xs center-md">
        <GetUserForm user={user} apiError={this.state.error} getUser={getUser} goTo={goTo}/>
      </div>
    );
  }
}