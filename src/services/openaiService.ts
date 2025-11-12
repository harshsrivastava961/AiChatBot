import axios from 'axios';
import { Message } from '../types';
import { GROQ_API_KEY } from '../config/apiConfig';

// Using Groq Cloud - OpenAI-compatible API with free tier
// Change this to 'https://api.openai.com/v1/chat/completions' if you want to use OpenAI
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Available Groq models (see https://console.groq.com/docs/models):
// - llama-3.1-8b-instant (fast starter, recommended default)
// - llama-3.1-70b-versatile (more capable, slightly slower)
// - mixtral-8x7b-32768 (excellent quality, longer context)
const MODEL = 'llama-3.1-8b-instant';

// Get API key from config
const getApiKey = () => {
  return GROQ_API_KEY;
};

export interface OpenAIError {
  message: string;
  type: string;
  code?: string;
}

// Helper function to delay execution
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(() => resolve(), ms));

export const sendMessageToOpenAI = async (
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  retryCount: number = 0
): Promise<string> => {
  const apiKey = getApiKey();
  const MAX_RETRIES = 2; // Maximum number of retries for rate limits
  const RETRY_DELAY = 2000; // Initial delay in milliseconds

  if (!apiKey || apiKey === 'YOUR_GROQ_API_KEY_HERE') {
    throw new Error(
      'API key not configured. Please set GROQ_API_KEY in src/config/apiConfig.ts. ' +
      'Get your free key from: https://console.groq.com/keys'
    );
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024, // Groq allows more tokens
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 30000, // 30 seconds timeout
      }
    );

    const assistantMessage =
      response.data.choices[0]?.message?.content?.trim();

    if (!assistantMessage) {
      throw new Error('No response from AI service');
    }

    return assistantMessage;
  } catch (error: any) {
    // Handle rate limit with retry logic (only for 429 errors, not quota exceeded)
    if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
      const errorData = error.response?.data;
      const isQuotaError = errorData?.error?.message?.toLowerCase().includes('quota') ||
                         errorData?.error?.message?.toLowerCase().includes('billing');
      
      // Only retry if it's a rate limit, not a quota issue
      if (!isQuotaError) {
        const delayTime = RETRY_DELAY * Math.pow(2, retryCount); // Exponential backoff
        console.log(`Rate limit hit, retrying in ${delayTime}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
        await delay(delayTime);
        return sendMessageToOpenAI(messages, retryCount + 1);
      }
    }
    if (error.response) {
      // API responded with error
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        throw new Error(
          'Invalid API key. Please check your Groq API key in src/config/apiConfig.ts. ' +
          'Get your free key from: https://console.groq.com/keys'
        );
      } else if (status === 429) {
        // Rate limit error - Groq has generous free limits, but still possible
        const rateLimitMessage = data?.error?.message || 'Rate limit exceeded';
        throw new Error(
          'Rate limit exceeded. Please wait a moment and try again. ' +
          'Groq free tier has generous limits, so this should be temporary.'
        );
      } else if (status === 500 || status === 502 || status === 503) {
        throw new Error('AI service error. Please try again in a few moments.');
      } else if (status === 402) {
        throw new Error(
          'Payment required. Please check your Groq account at console.groq.com'
        );
      } else {
        throw new Error(
          data?.error?.message || `API error (${status}). Please try again.`
        );
      }
    } else if (error.request) {
      // Request made but no response
      throw new Error(
        'Network error. Please check your internet connection.'
      );
    } else {
      // Error in request setup
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

