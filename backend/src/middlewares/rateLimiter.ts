import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../config/redis';
import { AppError } from '../utils/errorHandler';
import { queueTask } from '../services/taskService';

const SECOND_LIMIT = 1;
const MINUTE_LIMIT = 20;

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId as string;
  const now = Date.now();
  const secondKey = `ratelimit:${userId}:second`;
  const minuteKey = `ratelimit:${userId}:minute`;

  const [secondCount, minuteCount] = await Promise.all([
    redisClient.zCount(secondKey, now - 1000, now),
    redisClient.zCount(minuteKey, now - 60000, now),
  ]);

  if (secondCount >= SECOND_LIMIT || minuteCount >= MINUTE_LIMIT) {
    await queueTask(userId);
    return res.status(202).json({ message: 'Task queued due to rate limit' });
  }

  await Promise.all([
    redisClient.zAdd(secondKey, { score: now, value: now.toString() }),
    redisClient.zAdd(minuteKey, { score: now, value: now.toString() }),
    redisClient.expire(secondKey, 2),
    redisClient.expire(minuteKey, 61),
  ]);

  next();
};