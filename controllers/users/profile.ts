import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        emailAddress: true
      }
    });
    
    res.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
