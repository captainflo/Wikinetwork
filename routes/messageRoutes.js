const message = require('../controllers/message');

module.exports = app => {
  // create message
  app.post('/api/create/message', message.createMessage);
  // get all message from chatroom
  app.post('/api/allmessage/:id', message.getMessageByChatroom);
  // read message from chatroom
  app.post(`/api/read/message`, message.readMessage);
  // all unread message from chatRoom
  app.post(`/api/unread/message`, message.allUnreadMessagebyUser);
};
