// routes/securityPersonnel.routes.js

import express from "express";
import { register, login, getLivePersonnel, updateLiveStatus } from '../controllers/securityPersonnel.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/live', getLivePersonnel);
router.put('/live-status', verifyToken, updateLiveStatus);

export default router;