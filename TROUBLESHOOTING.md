# Troubleshooting Guide

## Rate Limit / Quota Errors

If you're seeing "Rate limit exceeded" or "Quota exceeded" errors, here's what to check:

### Common Causes

1. **Free Tier Credits Exhausted**
   - OpenAI free tier has limited credits
   - Check your usage at: https://platform.openai.com/usage
   - You may need to add billing information

2. **Rate Limiting (Too Many Requests)**
   - Making requests too quickly
   - The app will automatically retry with exponential backoff
   - Wait a few seconds between messages

3. **Account Billing Issues**
   - Free tier may require billing setup after initial credits
   - Visit: https://platform.openai.com/account/billing

### Solutions

#### Option 1: Check Your OpenAI Account
1. Go to https://platform.openai.com
2. Check your usage dashboard
3. Verify billing is set up if needed
4. Check if you have available credits

#### Option 2: Wait and Retry
- The app automatically retries rate limit errors (not quota errors)
- Wait 30-60 seconds before trying again
- Avoid sending multiple messages rapidly

#### Option 3: Upgrade Your Plan
- If you've exhausted free credits, consider upgrading
- Visit: https://platform.openai.com/account/billing

### Understanding Error Messages

- **"Rate limit exceeded"**: Too many requests too quickly → Wait and retry
- **"Quota exceeded"**: No credits remaining → Check account/billing
- **"Payment required"**: Billing not set up → Add payment method

## Other Common Issues

### API Key Not Working
- Verify the key is correct in `src/config/apiConfig.ts`
- Ensure there are no extra spaces or quotes
- Check that the key starts with `sk-`
- Verify the key is active at platform.openai.com

### Network Errors
- Check your internet connection
- Verify OpenAI API is accessible
- Try again in a few moments

### App Crashes
- Clear app data/cache
- Restart the app
- Check console logs for detailed errors

## Getting Help

1. Check OpenAI Status: https://status.openai.com
2. Review OpenAI Documentation: https://platform.openai.com/docs
3. Check your account dashboard for usage details

