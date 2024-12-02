// controllers/chat.controller.js

import Chat from "../models/chat.model.js";
import { errorHandler } from "../utils/error.js";

export const sendMessage = async (req, res, next) => {
  const { receiverId, receiverModel, message, attachments } = req.body;

  try {
    const newChat = new Chat({
      sender: req.user.id,
      senderModel: req.user.isSecurityPersonnel ? 'SecurityPersonnel' : 'User',
      receiver: receiverId,
      receiverModel,
      message,
      attachments,
    });

    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  const { userId, userModel } = req.params;

  try {
    const messages = await Chat.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};