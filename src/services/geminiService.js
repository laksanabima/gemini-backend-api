import { GoogleGenAI } from '@google/genai';
import { geminiApiKey } from '../config/index.js';

const ai = new GoogleGenAI({ apiKey: geminiApiKey });
const GEMINI_MODEL = 'gemini-3.5-flash-lite';

function buildConfig(system) {
  return system ? { systemInstruction: system } : undefined;
}

async function generateText(prompt, system) {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: buildConfig(system),
  });
  return response.text;
}

async function generateFromImage(prompt, image, system) {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [
      { text: prompt, type: 'text' },
      { inlineData: { data: image.buffer.toString('base64'), mimeType: image.mimetype } },
    ],
    config: buildConfig(system),
  });
  return response.text;
}

async function generateFromDocument(prompt, document, system) {
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
            { text: prompt ?? 'Tolong berikan rangkuman penting pada dokumen berikut', type: 'text'},
            { inlineData: { data: document.buffer.toString('base64'), mimeType: document.mimetype }}
        ],
        config: buildConfig(system),
    })
    return response.text;
}

async function generateFromAudio(prompt, audio, system) {
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
            { text: prompt ?? 'Tolong transkrip dari audio berikut', type: 'text'},
            { inlineData: { data: audio.buffer.toString('base64'), mimeType: audio.mimetype }}
        ],
        config: buildConfig(system),
    })
    return response.text;
}

export { generateText, generateFromImage, generateFromDocument, generateFromAudio };
