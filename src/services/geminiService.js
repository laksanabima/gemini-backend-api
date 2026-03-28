import { GoogleGenAI } from '@google/genai';
import { geminiApiKey } from '../config/index.js';

const ai = new GoogleGenAI({ apiKey: geminiApiKey });
const GEMINI_MODEL = 'gemini-2.5-flash';

async function generateText(prompt) {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });
  return response.text;
}

async function generateFromImage(prompt, image) {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [
      { text: prompt, type: 'text' },
      { inlineData: { data: image.buffer.toString('base64'), mimeType: image.mimetype } },
    ],
  });
  return response.text;
}

async function generateFromDocument(prompt, document) {
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
            { text: prompt ?? 'Tolong berikan rangkuman penting pada dokumen berikut', type: 'text'},
            { inlineData: { data: document.buffer.toString('base64'), mimeType: document.mimetype }}
        ]
    })
    return response.text;
}

async function generateFromAudio(prompt, audio) {
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
            { text: prompt ?? 'Tolong transkrip dari audio berikut', type: 'text'},
            { inlineData: { data: audio.buffer.toString('base64'), mimeType: audio.mimetype }}
        ]
    })
    return response.text;
}

export { generateText, generateFromImage, generateFromDocument, generateFromAudio };
