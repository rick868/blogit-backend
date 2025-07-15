import express from 'express';
import { uploadImageController } from '../controllers/upload/imageUpload';

const router = express.Router();

router.post('/image', uploadImageController[0] as express.RequestHandler, uploadImageController[1]);

export default router;
