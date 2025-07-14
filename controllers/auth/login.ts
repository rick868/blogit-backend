import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import { comparePasswords, generateToken } from '../../utils/auth';

export const login = async (req: Request, res: Response) => {
  try {
    const { emailAddressOrUserName, password } = req.body;
    
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { emailAddress: emailAddressOrUserName },
          { userName: emailAddressOrUserName }
        ]
      }
    });
    
    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user.id);
    
    res.json({ 
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
    res.status(500).json({ error: 'Login failed' });
  }
};