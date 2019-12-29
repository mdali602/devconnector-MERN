import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE
} from '../actions/actionTypes';
import { STATES } from 'mongoose';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROFILE:
      return {
        ...STATES,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}
