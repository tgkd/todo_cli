import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/user';
import Navigation from '../../components/Navigation';

import 'flexboxgrid';

import MainPage from '../../components/MainPage';

@connect(
  ({  }) => ({ }),
  (dispatch) => bindActionCreators(actions, dispatch)
)

export default class extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    const { logout } = this.props;
    logout()
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        })
      })
  }


  render() {
    return(
      <div className="main">
        <Navigation logout={::this.logout}/>
        <MainPage/>
      </div>
    )
  }
}