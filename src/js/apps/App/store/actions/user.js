import * as actions from '../constants/user';

export function getUserInfo(user) {
  return {
    type: actions.getUserInfo,
    payload: user
  };
}

export function updateUserInfo(user) {
  return {
    type: actions.updateUserInfo,
    payload: user
  };
}

export function terminateSession(session) {
  return {
    type: actions.terminateSession,
    payload: session
  };
}

export function logout(user) {
  return {
    type: actions.logout,
    payload: user
  };
}


