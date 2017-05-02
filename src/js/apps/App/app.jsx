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
            <Route path='/main' component={Routes.Main}/>
            <Route path='/profile' component={Routes.Profile}/>
            <Route path='/tasks' component={Routes.Tasks}/>
            <Route path='/calendar' component={Routes.Calendar}/>
            <Redirect from='*' to="/main"/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
