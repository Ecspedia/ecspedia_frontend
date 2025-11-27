import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
  apiKey: process.env['PERPLEXITY_API_KEY'], // This is the default and can be omitted
});

const streamChunk = await client.chat.completions.create({
  messages: [{ role: 'user', content: 'Tell me about the latest developments in AI' }],
  model: 'sonar',
});
