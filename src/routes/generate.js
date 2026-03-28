import express from 'express';
import multer from 'multer';
import {
  generateText,
  generateFromImage,
  generateFromDocument,
  generateFromAudio
} from '../controllers/generateController.js';

const router = express.Router();
const upload = multer();

router.post('/generate-text', generateText);
router.post('/generate-from-image', upload.single('image'), generateFromImage);
router.post('/generate-from-document', upload.single('document'), generateFromDocument);
router.post('/generate-from-audio', upload.single('audio'), generateFromAudio);

export default router;
