import {push} from 'react-router-redux';

export function goTo(location) {
  return (dispatch) => {
    return dispatch(push(location));
  };
}