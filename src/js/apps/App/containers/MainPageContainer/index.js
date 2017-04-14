import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/actionCreators/user';

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

  render() {
    return(
      <MainPage/>
    )
  }
}