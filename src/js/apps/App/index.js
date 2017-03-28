import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { Redirect, Route, Switch } from 'react-router';

import { BrowserRouter as Router } from 'react-router-dom';


import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import * as Routes from './routes';
import store from './store';

const history  = syncHistoryWithStore(createBrowserHistory(), store);


ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/main' component={Routes.Main} />
        <Route path='/profile' component={Routes.Profile} />
        <Route path='/tasks' component={Routes.Tasks} />
        <Route path='/calendar' component={Routes.Calendar} />
        <Redirect from='*' to="/main" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);



export default function (user) {
  console.log(user);
}
