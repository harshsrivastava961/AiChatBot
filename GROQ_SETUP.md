# Groq Cloud Setup Guide

## Quick Start

The app has been configured to use **Groq Cloud** instead of OpenAI. Groq offers:
- ✅ **Free tier** with generous rate limits
- ✅ **Very fast responses** (often faster than OpenAI)
- ✅ **OpenAI-compatible API** (minimal code changes)
- ✅ **No credit card required** for free tier

## Step 1: Get Your Free Groq API Key

1. Visit: https://console.groq.com
2. Sign up for a free account (Google/GitHub login available)
3. Go to: https://console.groq.com/keys
4. Click "Create API Key"
5. Copy your API key (starts with `gsk_...`)

## Step 2: Add API Key to App

1. Open `src/config/apiConfig.ts`
2. Replace `YOUR_GROQ_API_KEY_HERE` with your actual key:

```typescript
export const GROQ_API_KEY = 'gsk_your_actual_key_here';
```

## Step 3: Run the App

```bash
npm start
npm run android  # or npm run ios
```

That's it! The app will now use Groq Cloud.

## Available Models

The app is currently configured to use `llama-3.1-8b-instant` which is:
- Fast and responsive
- Good quality for most tasks
- Free tier friendly

You can change the model in `src/services/openaiService.ts`:

```typescript
const MODEL = 'llama-3.1-8b-instant';   // Fast, recommended default (current)
// const MODEL = 'llama-3.1-70b-versatile'; // More capable, slightly slower
// const MODEL = 'mixtral-8x7b-32768';      // Excellent quality
```

## Why Groq?

- **Speed**: Groq's hardware is optimized for AI inference, often faster than cloud GPUs
- **Free Tier**: Generous limits without credit card
- **OpenAI Compatible**: Same API format, easy to switch
- **Quality**: Llama 3 models are excellent for chat applications

## Troubleshooting

### "API key not configured" error
- Make sure you've added your key to `src/config/apiConfig.ts`
- Verify there are no extra spaces or quotes around the key

### Rate limit errors
- Groq free tier has high limits, but if you hit them:
  - Wait 30-60 seconds
  - The app will automatically retry
  - Check your usage at console.groq.com

### Still want to use OpenAI?
You can switch back by:
1. Change `API_URL` in `src/services/openaiService.ts` to:
   ```typescript
   const API_URL = 'https://api.openai.com/v1/chat/completions';
   ```
2. Change `MODEL` to `'gpt-3.5-turbo'`
3. Update `GROQ_API_KEY` to `OPENAI_API_KEY` in config

## Need Help?

- Groq Documentation: https://console.groq.com/docs
- Groq Console: https://console.groq.com
- Check API status: https://status.groq.com

