import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import { hashPassword, generateToken } from '../../utils/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ emailAddress: email }, { userName: username }] }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
      data: { firstName, lastName, userName: username, emailAddress: email, password: hashedPassword }
    });
    
    const token = generateToken(user.id);
    
    res.status(201).json({ 
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        emailAddress: user.emailAddress
      },
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};
