import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import * as Routes from './routes';
import store from './store';

const history  = syncHistoryWithStore(createBrowserHistory(), store);

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path='/find_by_email' component={Routes.GetUser} />
        <Route path='/login' component={Routes.Login} />
        <Route path='/register' component={Routes.Register} />
        <Redirect from='*' to="/find_by_email" />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

export default function authApp(error) {
  console.log(error);
}

/*
* <Router history={history}>
 <ul>
 <li><Link to="/find_by_email">find</Link></li>
 <li><Link to="/login">login</Link></li>
 <li><Link to="/register">register</Link></li>
 </ul>
 <Switch>
 <Route path='/find_by_email' component={Routes.GetUser} />
 <Route path='/login' component={Routes.Login} />
 <Route path='/register' component={Routes.Register} />
 <Redirect from='*' to="/find_by_email" />
 </Switch>
 </Router>*/