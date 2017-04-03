import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import * as reducers from './reducers';

const history = createHistory();

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const logger = createLogger();
const routerMid = routerMiddleware(history);

const initialState = {
  user: {},
  taskList: []
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger, thunk, routerMid));

export default {
  store,
  history
};