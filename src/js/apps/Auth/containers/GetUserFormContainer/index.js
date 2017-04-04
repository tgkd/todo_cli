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

  getUser(email) {
    const { goTo, getUser} = this.props;
    getUser(email)
      .then(data => {
        goTo('/login')
      })
      .catch(e => {
        if (e.response && e.response.status === 400) {
          goTo('/register')
        } else {
          this.setState({
            error: 'Ошибка, повторите попытку'
          })
        }
      })
  }


  render() {
    const {user} = this.props.user;

    return(
      <div className="row center-sm center-xs center-md">
        <GetUserForm user={user} apiError={this.state.error} getUserInfo={::this.getUser}/>
      </div>
    );
  }
}