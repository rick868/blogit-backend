import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getUserProfile } from '../controllers/users/profile';
import { updateUser } from '../controllers/users/update';
import { updatePassword } from '../controllers/users/password';
import { passwordUpdateRules, validateRequest } from '../utils/validation';

const router = Router();

router.get('/', authenticate, getUserProfile);
router.patch('/', authenticate, updateUser);
router.patch('/password', authenticate, passwordUpdateRules, validateRequest ,updatePassword,);

export default router;