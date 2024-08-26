 



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

app.use(errorHandler);

export default app;