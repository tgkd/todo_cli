import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { Redirect, Route, Switch } from 'react-router';

import {BrowserRouter as Router, Link} from 'react-router-dom';


import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import * as Routes from './routes';
import store from './store';
import * as actions from './store/constants/user';
import * as taskActions from './store/constants/task';

const history  = syncHistoryWithStore(createBrowserHistory(), store);


ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Link to='/main'> Home </Link>
        <Switch>
          <Route path='/main' component={Routes.Main} />
          <Route path='/profile' component={Routes.Profile} />
          <Route path='/tasks' component={Routes.Tasks} />
          <Route path='/calendar' component={Routes.Calendar} />
          <Redirect from='*' to="/main" />
        </Switch>
      </div>
    </Router>
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
