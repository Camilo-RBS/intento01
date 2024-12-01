import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { searchUsers, getNearbyUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/search', protect, searchUsers);
router.get('/nearby', protect, getNearbyUsers);

export default router;