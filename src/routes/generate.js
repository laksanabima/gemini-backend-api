import express from 'express';
import multer from 'multer';
import {
  generateText,
  generateFromImage,
  generateFromDocument,
  generateFromAudio
} from '../controllers/generateController.js';

const router = express.Router();

// Samakan dengan client_max_body_size di nginx dan batas inlineData Gemini
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

function createUpload(allowedMimeTypes) {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
        return;
      }
      cb(new Error(`Tipe file tidak didukung: ${file.mimetype}`));
    },
  });
}

const imageUpload = createUpload(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);
const documentUpload = createUpload(['application/pdf', 'text/plain']);
const audioUpload = createUpload(['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/aiff', 'audio/aac', 'audio/ogg', 'audio/flac']);

router.post('/generate-text', generateText);
router.post('/generate-from-image', imageUpload.single('image'), generateFromImage);
router.post('/generate-from-document', documentUpload.single('document'), generateFromDocument);
router.post('/generate-from-audio', audioUpload.single('audio'), generateFromAudio);

export default router;
