
import express from 'express';
import { createTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/auth';
import { rateLimiter } from '../middlewares/rateLimiter';

const router = express.Router();

router.post('/task', authenticate, rateLimiter, createTask);

export default router;