import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, userName, emailAddress } = req.body;
    
    const existingUser = await prisma.user.findFirst({
      where: {
        AND: [
          { id: { not: userId } },
          { OR: [{ emailAddress }, { userName }] }
        ]
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already in use' });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, userName, emailAddress },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        emailAddress: true
      }
    });
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};