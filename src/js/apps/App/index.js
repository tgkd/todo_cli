import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { Redirect, Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import * as Routes from './routes';
import Store from './store';
import * as actions from './store/constants/user';
import * as taskActions from './store/constants/task';

const { store, history } = Store;

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/main' component={Routes.Main} />
        <Route path='/profile' component={Routes.Profile} />
        <Route path='/tasks' component={Routes.Tasks} />
        <Route path='/calendar' component={Routes.Calendar} />
        <Redirect from='*' to="/main" />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);



export default function ({user, sessions, tasks}) {
  store.dispatch({
    type: actions.getUserInfo,
    payload: {...user, sessions}
  });


  store.dispatch({
    type: taskActions.getTasks,
    payload: tasks
  });
}
