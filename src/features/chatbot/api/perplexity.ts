'use server';
import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
  apiKey: process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY,
});

export async function sendMessageToPerplexity(message: string): Promise<string> {
  try {
    const streamChunk = await client.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'sonar',
      stream: true,
    });

    let fullResponse = '';
    for await (const chunk of streamChunk) {
      if (chunk.choices[0]?.delta?.content) {
        fullResponse += chunk.choices[0].delta.content;
      }
    }
    console.log(fullResponse);
    return fullResponse;
  } catch (error) {
    console.error('Perplexity API error:', error);
    throw error;
  }
}
