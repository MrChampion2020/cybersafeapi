// models/chat.model.js

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true,
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['User', 'SecurityPersonnel', 'Visitor'],
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: true,
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['User', 'SecurityPersonnel', 'Visitor'],
  },
  message: {
    type: String,
    required: true,
  },
  attachments: [{
    type: String,
    enum: ['image', 'video', 'pdf'],
  }],
  attachmentUrls: [String],
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;