import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { sendMessage, getMessages, deleteMessage } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/', protect, getMessages); // Mensajes globales
router.get('/:userId', protect, getMessages); // Mensajes privados
router.post('/', protect, sendMessage);
router.delete('/:id', protect, deleteMessage);

export default router;