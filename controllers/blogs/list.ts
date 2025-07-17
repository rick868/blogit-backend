import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.post.findMany({
      where: { isDeleted: false },
      include: { users: true }
    });
    res.json(blogs);
  } catch (error) {
    console.error('List blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export const getUserBlogs = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const blogs = await prisma.post.findMany({
      where: { userId, isDeleted: false },
      include: { users: true }
    });
    res.json(blogs);
  } catch (error) {
    console.error('List user blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch user blogs' });
  }
};
