import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;
    const { title, synopsis, content, featuredImage } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: userId missing' });
    }
    
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
    
    const updatedBlog = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title || blog.title,
        synopsis: synopsis || blog.synopsis,
        content: content || blog.content,
        featuredImage: featuredImage || blog.featuredImage
      },
      include: { users: true }
    });
    
    res.json(updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
};
