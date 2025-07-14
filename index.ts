import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import authRouter from './routes/auth';
import blogRouter from './routes/blogs';
import userRouter from './routes/users';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});