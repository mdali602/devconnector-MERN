import { SET_ALERT, REMOVE_ALERT } from '../actions/actionTypes';

const inititalState = [];

export default function(state = inititalState, { type, payload }) {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
