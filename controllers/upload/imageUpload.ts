import { Request, Response } from 'express';
import multer from 'multer';
import { uploadImage } from '../../utils/cloudinary';

const upload = multer({ dest: 'uploads/' });

export const uploadImageController = [
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      const file = (req as any).file;
      if (!file) {
        return res.status(400).json({ error: 'No image file provided' });
      }
      const imageUrl = await uploadImage(file.path);
      res.json({ imageUrl });
    } catch (error) {
      console.error('Image upload error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }
];
