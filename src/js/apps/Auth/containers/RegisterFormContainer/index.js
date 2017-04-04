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
    this.state = {
      error: ''
    }
  }

  register(credentials) {
    const { register } = this.props;
    register(credentials, this.sessionInfo)
      .then(data => {
        window.location.href = '/';
      })
      .catch(e => {
        if (e.response && e.response.status === 400) {
          this.setState({
            error: 'Пользователь с таким e-mail уже существует'
          })
        } else {
          this.setState({
            error: 'Ошибка, повторите попытку'
          })
        }
      });
  }

  render() {
    return (
      <div className="row center-xs center-md center-md">
        <RegisterForm  register={::this.register} apiError={this.state.error} sessionInfo={this.sessionInfo}/>
      </div>
    )
  }
}