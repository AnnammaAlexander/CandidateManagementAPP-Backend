import express from 'express';
import { register, login, logout, refreshToken } from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/logout', protect, logout);

export default router;
