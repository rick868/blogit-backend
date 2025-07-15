import { Request, Response } from 'express';
import prisma from '../../prisma/client';


interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const getUserBlogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const blogs = await prisma.post.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ error: 'Failed to fetch user blogs' });
  }
};
