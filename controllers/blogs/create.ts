import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, synopsis, content, featuredImage } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: userId missing' });
    }
    
    const blog = await prisma.post.create({
      data: {
        title,
        synopsis,
        content,
        featuredImage,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: { users: true }
    });
    
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};
