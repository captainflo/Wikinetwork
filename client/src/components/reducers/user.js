import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_USER,
  GET_USER_ERROR
} from '../actions/types';
const INITIAL_STATE = {
  allUsers: '',
  userDetails: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload || false };
    case GET_USER:
      return { ...state, userDetails: action.payload || false };
    case GET_ALL_USERS_ERROR || GET_USER_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
