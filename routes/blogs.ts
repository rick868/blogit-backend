import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createBlog } from '../controllers/blogs/create';
import { getAllBlogs, getUserBlogs } from '../controllers/blogs/list';
import { getBlog } from '../controllers/blogs/get';
import { updateBlog } from '../controllers/blogs/update';
import { deleteBlog } from '../controllers/blogs/delete';

const router = Router();

router.get('/', getAllBlogs);
router.get('/user', authenticate, getUserBlogs);
router.post('/', authenticate, createBlog);
router.get('/:postId', getBlog);
router.patch('/:postId', authenticate, updateBlog);
router.delete('/:postId', authenticate, deleteBlog);

export default router;
