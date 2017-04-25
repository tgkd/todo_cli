import * as actions from '../constants/user';

export default function (state = {}, action) {
  switch (action.type) {
    case actions.getUserInfo:
      return {...action.payload};
    case actions.updateUserInfo:
      return {user: action.payload};
    case actions.logout:
      return {};
    case actions.terminateSession:
      return { sessions: action.payload };
    default:
      return state;
  }
}