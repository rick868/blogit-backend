import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;
    
    const blog = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: userId,
        isDeleted: false
      }
    });
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found or unauthorized' });
    }
    
    await prisma.post.update({
      where: { id: postId },
      data: { isDeleted: true }
    });
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};
