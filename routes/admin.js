import express from 'express';
import { getCandidates } from '../controllers/admin.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Admin only routes
router.use(protect);
router.use(authorize('admin'));

router.get('/candidates', getCandidates);

export default router;
