import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const getBlog = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    
    const blog = await prisma.post.findFirst({
      where: {
        id: postId,
        isDeleted: false
      },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};