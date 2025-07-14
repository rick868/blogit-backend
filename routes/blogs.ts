import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createBlog } from '../controllers/blogs/create';
import { getAllBlogs } from '../controllers/blogs/list';
import { getBlog } from '../controllers/blogs/get';
import { updateBlog } from '../controllers/blogs/update';
import { deleteBlog } from '../controllers/blogs/delete';

const router = Router();

router.get('/', getAllBlogs);
router.post('/', authenticate, createBlog);
router.get('/:blogId', getBlog);
router.patch('/:blogId', authenticate, updateBlog);
router.delete('/:blogId', authenticate, deleteBlog);

export default router;