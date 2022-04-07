const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderAvatar: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "unchecked",
  },
  receiverId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});
module.exports = mongoose.model("notification", notificationSchema);
