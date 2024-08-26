import { redisClient } from '../config/redis';
import logger from '../utils/logger';

export const queueTask = async (userId: string): Promise<void> => {
  const queueKey = `taskqueue:${userId}`;
  await redisClient.rPush(queueKey, Date.now().toString());
};

export const processTask = async (userId: string): Promise<void> => {
  const queueKey = `taskqueue:${userId}`;
  const taskTimestamp = await redisClient.lPop(queueKey);

  if (taskTimestamp) {
    await task(userId);
  }
};

async function task(userId: string): Promise<void> {
  const completionTime = Date.now();
  logger.info(`${userId}-task completed at-${completionTime}`);
  console.log(`${userId}-task completed at-${completionTime}`);
}

export const startTaskProcessor = (): void => {
  setInterval(async () => {
    const userQueues = await redisClient.keys('taskqueue:*');
    for (const queueKey of userQueues) {
      const userId = queueKey.split(':')[1];
      await processTask(userId);
    }
  }, 1000);
};