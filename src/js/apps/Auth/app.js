import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import * as Routes from './routes';
import Store from './store';

const { store, history } = Store;

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/find_by_email' component={Routes.GetUser}/>
            <Route path='/login' component={Routes.Login}/>
            <Route path='/register' component={Routes.Register}/>
            <Redirect from='*' to="/find_by_email"/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

