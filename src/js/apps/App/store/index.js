import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory }  from 'history';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const logger = createLogger();

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(logger, thunk, routerMiddleware(createBrowserHistory())));

export default store;