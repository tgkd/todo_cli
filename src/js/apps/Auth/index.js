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
        <Route path='/find_by_email' component={Routes.GetUser} />
        <Route path='/login' component={Routes.Login} />
        <Route path='/register' component={Routes.Register} />
        <Redirect from='*' to="/find_by_email" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);



export default function (error) {
  console.log(error);
}
