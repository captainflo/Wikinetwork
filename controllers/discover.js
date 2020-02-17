const User = require('../models/User');
const Discover = require('../models/Discover');

exports.getAllUsers = function(req, res, next) {
  User.find(function(error, user) {
    if (error) {
      return next(error);
    }
    res.send(user);
  });
};

exports.getDiscoverByUser = function(req, res, next) {
  Discover.find({ author: req.params.id }, function(error, user) {
    if (error) {
      return next(error);
    }
    res.send(user);
  });
};

exports.createDiscover = function(req, res, next) {
  const userId = req.body.userId;
  const friendId = req.body.friendId;
  const isMatch = req.body.isMatch;

  const discover = new Discover({
    author: userId,
    friendId: friendId,
    isMatch: isMatch
  });

  discover.save(function(error, discover) {
    if (error) {
      return next(error);
    }
    res.send(discover);
  });
  if (isMatch === true) {
    User.findOneAndUpdate(
      { _id: friendId },
      { $push: { liked: userId } },
      { new: true },
      err => {
        if (err) {
          console.log('Something wrong when updating data!');
        }
      }
    );
  } else {
    User.findOneAndUpdate(
      { _id: friendId },
      { $push: { unliked: userId } },
      { new: true },
      err => {
        if (err) {
          console.log('Something wrong when updating data!');
        }
      }
    );
  }
};

exports.getAllDiscovers = function(req, res, next) {
  Discover.find(function(error, discover) {
    if (error) {
      return next(error);
    }
    res.send(discover);
  });
};
