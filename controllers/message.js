const Message = require("../models/Message");
const Chat = require("../models/Chat");

exports.createMessage = function(req, res, next) {
  const room = req.body.room;
  const user = req.body.user;
  const message_body = req.body.message;

  const message = new Message({
    room: room,
    user: user,
    message_body: message_body
  });

  message.save(function(error, message) {
    if (error) {
      return next(error);
    }
    res.send(message);
  });

  Chat.findOneAndUpdate(
    { _id: room },
    { $push: { messages: message._id } },
    { new: true },
    err => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );

  Chat.findOneAndUpdate(
    { _id: room },
    { lastMessage: message_body, dateMessage: Date.now() },
    err => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );

  Chat.findOne({ _id: room }, function(error, chat) {
    if (error) {
      return next(error);
    }
    // if i am the Sender in this chat
    // push to unreadReceiver
    if (user == chat.sender) {
      Chat.findOneAndUpdate(
        { _id: message.room },
        { $push: { unreadReceiver: message._id } },
        { new: true },
        err => {
          if (err) {
            console.log("Something wrong when delete unreadReceiver!");
          }
        }
      );
    } else {
      // if i am the Receiver in this chat
      // push to unreadSender
      Chat.findOneAndUpdate(
        { _id: message.room },
        { $push: { unreadSender: message._id } },
        { new: true },
        err => {
          if (err) {
            console.log("Something wrong when delete unreadSender!");
          }
        }
      );
    }
  });
};

exports.getMessageByChatroom = function(req, res, next) {
  Message.find({ room: req.params.id }, function(error, message) {
    if (error) {
      return next(error);
    }
    res.send(message);
  });
};

exports.allUnreadMessagebyUser = function(req, res, next) {
  const idchatroom = req.body.chatId;
  const user = req.body.user;
  const query = {
    $and: [{ room: idchatroom }, { user: user }, { status: true }]
  };
  Message.find(query, function(error, message) {
    if (error) {
      return next(error);
    }
    res.json(message.length);
  });
};

exports.readMessage = function(req, res, next) {
  const room = req.body.room;
  const user = req.body.user;

  Chat.findOne({ _id: room }, function(error, chat) {
    if (error) {
      return next(error);
    }
    // console.log(chat.sender);
    // console.log(user);
    if (user == chat.sender) {
      // if i am the Sender in this chat
      // delete to unreadReceiver
      Chat.update({ _id: room }, { $unset: { unreadSender: 1 } }, err => {
        if (err) {
          console.log("Something wrong when delete unreadReceiver!");
        }
      });
    } else {
      // if i am the receiver in this chat
      // delete to unreadReceiver.
      Chat.update({ _id: room }, { $unset: { unreadReceiver: 1 } }, err => {
        if (err) {
          console.log("Something wrong when delete unreadSender!");
        }
      });
    }
  });
};
