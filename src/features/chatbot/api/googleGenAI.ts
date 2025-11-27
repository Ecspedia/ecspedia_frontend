'use server';
import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const groundingTool = {
  googleSearch: {},
};
const config = {
  tools: [groundingTool],
};
const chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: config,
});

export async function sendMessageToGoogleGenAi(message: string): Promise<string> {
  try {
    const response = await chat.sendMessage({
      message: message,
    });
    return response.text || '';
  } catch (error) {
    console.error('Google Gen AI API error:', error);
    throw error;
  }
}
