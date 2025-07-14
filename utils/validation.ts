import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const registerRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const blogCreateRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('synopsis').notEmpty().withMessage('Synopsis is required'),
  body('content').notEmpty().withMessage('Content is required')
];

export const passwordUpdateRules = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
];
