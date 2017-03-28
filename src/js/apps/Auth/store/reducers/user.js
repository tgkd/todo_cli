import * as actions from '../constants';

export default function (state = {}, action) {
  switch (action.type) {
    case actions.login:
      return {user: action.payload};
    case actions.register:
      return {...state, user: action.payload};
    case actions.getUser:
      return {user: action.payload.user, triedToEnter: action.payload.triedToEnter};
    case actions.error:
      return {error: action.payload};
    default:
      return state
  }
}