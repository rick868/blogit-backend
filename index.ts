/// <reference path="./types/express.d.ts" />
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import authRouter from './routes/auth';
import blogRouter from './routes/blogs';
import userRouter from './routes/users';
import uploadRouter from './routes/upload';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({
  origin: 'https://blogit-client-7faq.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/upload', uploadRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
