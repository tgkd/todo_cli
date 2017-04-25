import * as actions from '../constants';

export function login(user) {
  return {
    type: actions.login,
    payload: user
  };
}

export function register(user) {
  return {
    type: actions.register,
    payload: user
  };
}

export function getUser(user) {
  return {
    type: actions.getUser,
    payload: user
  };
}

