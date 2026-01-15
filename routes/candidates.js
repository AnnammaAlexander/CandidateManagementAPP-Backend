import express from 'express';
import { getMe } from '../controllers/candidates.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', protect, getMe);

export default router;
