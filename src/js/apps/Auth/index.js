import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import {Redirect, Route, Switch} from 'react-router';

import { ConnectedRouter } from 'react-router-redux';
import * as Routes from './routes';
import Store from './store';

const { store, history } = Store;

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/find_by_email' component={Routes.GetUser}/>
        <Route path='/login' component={Routes.Login}/>
        <Route path='/register' component={Routes.Register}/>
        <Redirect from='*' to="/find_by_email" />
      </Switch>

    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);


export default function (error) {
  console.log(error);
}
