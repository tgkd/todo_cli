import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app';
import Store from './store';
import * as actions from './store/constants/user';
import * as taskActions from './store/constants/task';

const { store } = Store;

const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);


if (module.hot) {
  module.hot.accept('./app.js', (arg) => {
    const App = require('./app.js').default;
    render(App);
  });
}

export default function ({ user, sessions, tasks }) {
  store.dispatch({
    type: actions.getUserInfo,
    payload: { user, sessions }
  });

  store.dispatch({
    type: taskActions.getTasks,
    payload: tasks
  });
}
