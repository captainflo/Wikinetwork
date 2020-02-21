const Chat = require("../models/Chat");
const User = require("../models/User");

exports.createChatroom = function(req, res, next) {
  const sender = req.body.sender;
  const receiver = req.body.receiver;

  const chatroom = new Chat({
    sender: sender,
    receiver: receiver
  });

  chatroom.save(function(error, chatroom) {
    if (error) {
      return next(error);
    }
    res.send(chatroom);
  });

  User.findOneAndUpdate(
    { _id: sender },
    { $push: { chatroom: chatroom._id } },
    { new: true },
    err => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
  User.findOneAndUpdate(
    { _id: receiver },
    { $push: { chatroom: chatroom._id } },
    { new: true },
    err => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
};

exports.getAllUserByChatroom = function(req, res, next) {
  User.find({ chatroom: req.params.id })
    .populate("chatroom")
    .exec(function(err, users) {
      if (err) return handleError(err);
      res.send(users);
    });
};

exports.getReceiver = function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(error, user) {
    if (error) {
      return next(error);
    }
    res.send(user);
  });
};

exports.getSender = function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(error, user) {
    if (error) {
      return next(error);
    }
    res.send(user);
  });
};

exports.getAllChatRoomByUSer = function(req, res, next) {
  const query = {
    $or: [{ sender: req.params.id }, { receiver: req.params.id }]
  };
  Chat.find(query, function(error, chat) {
    if (error) {
      return next(error);
    }
    res.send(chat);
  });
};
