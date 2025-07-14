import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/blogit',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  SALT_ROUNDS: 10
};