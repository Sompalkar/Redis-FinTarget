
import cluster from 'cluster';
import os from 'os';
import app from './app';
import connectDB from './config/database';
import { connectRedis } from './config/redis';
import { startTaskProcessor } from './services/taskService';

const PORT = process.env.PORT  ;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const startServer = async () => {
    await connectDB();
    await connectRedis();

    startTaskProcessor();

    app.listen(PORT, () => {
      console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
  };

  startServer();
}