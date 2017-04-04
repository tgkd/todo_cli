import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/login';
import sessionInfo from '../../../../libs/session';
import {Redirect} from "react-router-dom";

import LoginForm from '../../components/LoginForm';

@connect(
  ({ user }) => ({ user }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
    this.sessionInfo = sessionInfo();
    this.state = {
      error: ''
    };
  }

  login(credentials) {
    const { login } = this.props;
    login(credentials, this.sessionInfo)
      .then(data => {
        window.location.href = '/';
      })
      .catch(e => {
        if (e.response && e.response.status === 400) {
          this.setState({
            error: 'Неверный пароль'
          })
        } else {
          this.setState({
            error: 'Ошибка, повторите попытку'
          })
        }
      });
  }

  render() {
    const { user } = this.props.user;

    if(user && user.email) {
      return(
        <div className="row center-xs center-md center-md">
          <LoginForm login={::this.login} user={user} apiError={this.state.error} sessionInfo={this.sessionInfo}/>
        </div>
      );
    } else {
      return <Redirect to="/find_by_email" />
    }
  }
}