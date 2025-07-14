import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, config.SALT_ROUNDS);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, config.JWT_SECRET) as { userId: string };
};
