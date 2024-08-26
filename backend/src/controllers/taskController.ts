
import { Request, Response, NextFunction } from 'express';
import { queueTask, processTask } from '../services/taskService';
import { AppError } from '../utils/errorHandler';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId as string;
    await processTask(userId);
    res.status(202).json({ message: 'Task processed successfully' });
  } catch (error) {
    next(new AppError('Error processing task', 500));
  }
};