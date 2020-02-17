import {
  CREATE_MESSAGE,
  MESSAGE_ERROR,
  GET_MESSAGE,
  READ_MESSAGE,
  ERROR_READ_MESSAGE
} from '../actions/types';
const INITIAL_STATE = {
  messageCreate: '',
  errorMessage: '',
  errorUnreadMessage: '',
  allMessage: '',
  unreadMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return { ...state, createMessage: action.payload || false };
    case GET_MESSAGE:
      return { ...state, allMessage: action.payload || false };
    case MESSAGE_ERROR:
      return { ...state, errorMessage: action.payload };
    case READ_MESSAGE:
      return { ...state, unreadMessage: action.payload || false };
    case ERROR_READ_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
