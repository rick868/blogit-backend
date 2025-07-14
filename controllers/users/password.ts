import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import { comparePasswords, hashPassword } from '../../utils/auth';

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user || !(await comparePasswords(currentPassword, user.password))) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    const hashedPassword = await hashPassword(newPassword);
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
};
