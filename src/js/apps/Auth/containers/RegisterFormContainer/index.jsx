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
    return (
      <div className="row center-xs center-md center-md register-row">
        <RegisterForm register={register} sessionInfo={this.sessionInfo}/>
      </div>
    );
  }
}