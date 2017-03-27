import * as actions from '../actions/login';
import Auth from '../../../../libs/auth';

const auth = new Auth();

export function getUser(email) {
  return (dispatch) => {
    return auth
      .getUser(email)
      .then(user => {
        dispatch(actions.getUser(user));
      })
      .catch(error => {
        console.error(error);
        dispatch(actions.error(error));
      })
  }
}

export function register(credentials, sessionInfo) {
  return (dispatch) => {
    return auth
      .register(credentials, sessionInfo)
      .then(user => {
        dispatch(actions.register(user));
      })
      .catch(error => {
        dispatch(actions.error(error));
      })
  }
}

export function login(credentials, sessionInfo) {
  return (dispatch) => {
    return auth
      .login(credentials, sessionInfo)
      .then(user => {
        dispatch(actions.login(user));
      })
      .catch(error => {
        dispatch(actions.error(error));
      })
  }
}