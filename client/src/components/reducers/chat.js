import {
  CREATE_CHAT,
  ERROR_CHAT,
  GET_USERS_BY_CHATROOM,
  GET_USERS_BY_CHATROOM_ERROR,
  GET_ALL_CHAT_BY_USER,
  ERROR_ALL_CHAT_BY_USER
} from "../actions/types";
const INITIAL_STATE = {
  chats: "",
  errorChat: "",
  users: "",
  allChatByUser: "",
  errorAllChatByUser: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CHAT:
      return { ...state, chats: action.payload || false };
    case ERROR_CHAT || GET_USERS_BY_CHATROOM_ERROR:
      return { ...state, errorChat: action.payload };
    case GET_USERS_BY_CHATROOM:
      return { ...state, users: action.payload || false };
    case GET_ALL_CHAT_BY_USER:
      return { ...state, allChatByUser: action.payload };
    case ERROR_ALL_CHAT_BY_USER:
      return { ...state, errorAllChatByUser: action.payload };
    default:
      return state;
  }
}
