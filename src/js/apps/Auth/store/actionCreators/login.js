import * as actions from '../actions/login';
import Auth from '../../../../libs/auth';

const auth = new Auth();

export function getUser(email) {
  return (dispatch) => {
    return auth
      .getUser(email)
        .then(response => {
          dispatch(actions.getUser(response.data));
        })
  }
}

export function register(credentials, sessionInfo) {
  return (dispatch) => {
    return auth
      .register(credentials, sessionInfo)
        .then(response => {
          dispatch(actions.register(response.data));
        })
  }
}

export function login(credentials, sessionInfo) {
  return (dispatch) => {
    return auth
      .login(credentials, sessionInfo)
        .then(response => {
          dispatch(actions.login(response.data));
        })
    }
}