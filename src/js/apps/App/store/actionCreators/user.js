import * as actions from '../actions/user';
import Auth from 'libs/auth';
import User from 'libs/user';

const auth = new Auth();
const user = new User();

export function getUserInfo() {
  return async (dispatch) => {
    const response = await user.get();
    dispatch(actions.getUserInfo(response.data));
  };
}

export function updateUserInfo(userInfo) {
  return async (dispatch) => {
    const response = await user.update(userInfo);
    dispatch(actions.updateUserInfo(response.data));
  };
}

export function terminateSession(sessionId) {
  return async (dispatch) => {
    const response = await user.terminateSession(sessionId);
    dispatch(actions.terminateSession(response.data));
  };
}

export function logout() {
  return async (dispatch) => {
    const response = await auth.logout();
    dispatch(actions.logout(response.data));
  };
}