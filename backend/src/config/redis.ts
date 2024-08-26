import { createClient } from 'redis';



const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';

const redisClient = createClient({ url:REDIS_URL });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
  console.log('Redis connected');
};

export { redisClient, connectRedis }; 