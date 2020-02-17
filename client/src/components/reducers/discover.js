import {
  CREATE_DISCOVER,
  DISCOVER_ERROR,
  GET_ALL_DISCOVERS,
  GET_ALL_DISCOVERS_ERROR,
  GET_DISCOVERS,
  GET_DISCOVERS_ERROR
} from '../actions/types';
const INITIAL_STATE = {
  errorMessage: '',
  createDiscover: '',
  allDiscovers: '',
  discoverByUser: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_DISCOVER:
      return { ...state, createDiscover: action.payload || false };
    case DISCOVER_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_ALL_DISCOVERS:
      return { ...state, allDiscovers: action.payload || false };
    case GET_ALL_DISCOVERS_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_DISCOVERS:
      return { ...state, discoverByUser: action.payload || false };
    case GET_DISCOVERS_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
