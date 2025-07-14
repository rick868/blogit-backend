import { Router } from 'express';
import { register } from '../controllers/auth/register';
import { login } from '../controllers/auth/login';
import { logout } from '../controllers/auth/logout';
import { registerRules, validateRequest } from '../utils/validation';

const router = Router();

router.post('/register', registerRules, validateRequest, register);
router.post('/login', login);
router.post('/logout', logout);

export default router;