import * as actions from '../actions/user';
import Auth from 'libs/auth';
import User from 'libs/user';

const auth = new Auth();
const user = new User();

export function getUserInfo() {
  return (dispatch) => {
    return user
      .get()
      .then(response => {
        dispatch(actions.getUserInfo(response.data));
      })
  }
}

export function updateUserInfo(userInfo) {
  return (dispatch) => {
    return user
      .update(userInfo)
      .then(response => {
        dispatch(actions.updateUserInfo(response.data));
      })
  }
}

export function terminateSession(sessionId) {
  return (dispatch) => {
    return user
      .terminateSession(sessionId)
      .then(response => {
        dispatch(actions.terminateSession(response.data));
      })
  }
}

export function logout() {
  return (dispatch) => {
    return auth
      .logout()
      .then(response => {
        dispatch(actions.logout(response.data));
      })
  }
}