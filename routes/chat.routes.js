// routes/chat.routes.js

import express from "express";
import { sendMessage, getMessages } from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/send', verifyToken, sendMessage);
router.get('/:userId/:userModel', verifyToken, getMessages);

export default router;