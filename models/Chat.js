const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const chatroomSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'users' },
    receiver: { type: Schema.Types.ObjectId, ref: 'users' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
    unreadSender: [{ type: Schema.Types.ObjectId, ref: 'message' }],
    unreadReceiver: [{ type: Schema.Types.ObjectId, ref: 'message' }]
  },
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

// Create the model class
const ModelClass = mongoose.model('chatroom', chatroomSchema);

// Export the model
module.exports = ModelClass;
