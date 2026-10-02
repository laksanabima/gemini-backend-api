import {
  generateText as generateTextService,
  generateFromImage as generateFromImageService,
  generateFromDocument as generateFromDocumentService,
  generateFromAudio as generateFromAudioService
} from '../services/geminiService.js';

async function generateText(req, res) {
  const { prompt, system } = req.body;
  try {
    const result = await generateTextService(prompt, system);
    res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
}

async function generateFromImage(req, res) {
  const { prompt, system } = req.body;
  const image = req.file;
  if (!image) {
    return res.status(400).json({ message: 'File "image" wajib diunggah' });
  }
  try {
    const result = await generateFromImageService(prompt, image, system);
    res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
}

async function generateFromDocument(req, res) {
    const { prompt, system } = req.body;
    const document = req.file;
    if (!document) {
        return res.status(400).json({ message: 'File "document" wajib diunggah' });
    }
    try {
        const result = await generateFromDocumentService(prompt, document, system);
        res.status(200).json({ result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
}

async function generateFromAudio(req, res) {
    const { prompt, system } = req.body;
    const audio = req.file;
    if (!audio) {
        return res.status(400).json({ message: 'File "audio" wajib diunggah' });
    }
    try {
        const result = await generateFromAudioService(prompt, audio, system);
        res.status(200).json({ result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
}

export { generateText, generateFromImage, generateFromDocument, generateFromAudio };
