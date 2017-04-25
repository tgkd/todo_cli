import * as actions from '../actions/login';
import Auth from '../../../../libs/auth';

const auth = new Auth();

export function getUser(email) {
  return async (dispatch) => {
    const response = await auth.getUser(email);
    dispatch(actions.getUser(response.data));
  };
}

export function register(credentials, sessionInfo) {
  return async (dispatch) => {
    const response = await auth.register(credentials, sessionInfo);
    dispatch(actions.register(response.data));
  };
}

export function login(credentials, sessionInfo) {
  return async (dispatch) => {
    const response = await auth.login(credentials, sessionInfo);
    dispatch(actions.login(response.data));
  };
}