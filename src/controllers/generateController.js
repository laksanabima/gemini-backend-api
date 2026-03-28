import {
  generateText as generateTextService,
  generateFromImage as generateFromImageService,
  generateFromDocument as generateFromDocumentService,
  generateFromAudio as generateFromAudioService
} from '../services/geminiService.js';

async function generateText(req, res) {
  const { prompt } = req.body;
  try {
    const result = await generateTextService(prompt);
    res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
}

async function generateFromImage(req, res) {
  const { prompt } = req.body;
  const image = req.file;
  try {
    const result = await generateFromImageService(prompt, image);
    res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
}

async function generateFromDocument(req, res) {
    const { prompt } = req.body;
    const document = req.file;
    try {
        const result = await generateFromDocumentService(prompt, document);
        res.status(200).json({ result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
}

async function generateFromAudio(req, res) {
    const { prompt } = req.body;
    const audio = req.file;
    try {
        const result = await generateFromAudioService(prompt, audio);
        res.status(200).json({ result });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
}

export { generateText, generateFromImage, generateFromDocument, generateFromAudio };
