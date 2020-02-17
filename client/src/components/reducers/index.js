import { combineReducers } from 'redux';
import auth from './auth';
import discover from './discover';
import user from './user';
import chat from './chat';
import message from './message';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: auth,
  form: formReducer,
  discover: discover,
  user: user,
  chat: chat,
  message: message
});
