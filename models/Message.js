const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const messageSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: 'chatroom' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    message_body: String,
    status: { type: Boolean, default: false }
  },
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

// Create the model class
const ModelClass = mongoose.model('message', messageSchema);

// Export the model
module.exports = ModelClass;
