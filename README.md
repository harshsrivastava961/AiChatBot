# AI ChatBot - React Native App

A simple AI-powered chatbot application built with React Native, featuring **Groq Cloud's** Llama 3.1 models via their OpenAI-compatible API. This app provides a clean, modern chat interface with dark mode support, persistent chat history, and smooth user experience.

## Features

- 🤖 **AI Chat Interface**: Conversational AI powered by Groq Cloud's Llama 3.1 models (OpenAI-compatible API)
- 💬 **Chat History**: Persistent local storage using AsyncStorage
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Cross-Platform**: Works on both iOS and Android
- 🎨 **Modern UI**: Clean, Figma-inspired design with smooth animations
- ⚡ **Fast & Responsive**: Optimized for performance

## Prerequisites

Before you begin, ensure you have:

- Node.js (>= 20)
- React Native development environment set up
  - [Android Setup](https://reactnative.dev/docs/environment-setup?os=android)
  - [iOS Setup](https://reactnative.dev/docs/environment-setup?os=ios)
- Groq Cloud API key ([Get one here](https://console.groq.com/keys))

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Configure Groq API Key**:
   
   Open `src/config/apiConfig.ts` and replace `YOUR_GROQ_API_KEY_HERE` with your actual Groq API key:
   ```typescript
   export const GROQ_API_KEY = 'gsk_your_actual_api_key_here';
   ```
   
   ⚠️ **Important**: Never commit your API key to version control. The `apiConfig.ts` file is already in `.gitignore` and should be kept private.

4. **iOS Setup** (iOS only):
   ```sh
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

## Running the App

### Start Metro Bundler

```sh
npm start
```

### Run on Android

```sh
npm run android
```

### Run on iOS

```sh
npm run ios
```

## Project Structure

```
AiChatBot/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── MessageBubble.tsx
│   │   └── LoadingIndicator.tsx
│   ├── config/              # Configuration files
│   │   └── apiConfig.ts     # API key configuration
│   ├── context/             # React Context providers
│   │   └── ThemeContext.tsx
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/             # App screens
│   │   ├── SplashScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── AboutScreen.tsx
│   ├── services/            # API and storage services
│   │   ├── openaiService.ts  # Groq Cloud (OpenAI-compatible) client
│   │   └── storageService.ts
│   ├── theme/               # Theme configuration
│   │   └── colors.ts
│   └── types/               # TypeScript type definitions
│       └── index.ts
├── App.tsx                   # Main app component
└── package.json
```

## Configuration

### API Key Setup

The app uses Groq Cloud's OpenAI-compatible Chat Completions API. To configure:

1. Get your API key from [Groq Console](https://console.groq.com/keys)
2. Update `src/config/apiConfig.ts` with your key
3. Default model is `llama-3.1-8b-instant` (fast, free-tier friendly). You can change the model in `src/services/openaiService.ts`.

> Want to use OpenAI instead? Swap the API URL and model in `src/services/openaiService.ts` and set `OPENAI_API_KEY` instead of `GROQ_API_KEY`.

### Theme Customization

Colors can be customized in `src/theme/colors.ts`. The app supports:
- Light theme (default)
- Dark theme (toggleable in Settings)

## Usage

1. **Start a Conversation**: Type a message in the input field and tap send
2. **View History**: All conversations are automatically saved locally and restored on launch or when returning to the chat screen
3. **Change Theme**: Go to Settings → Toggle Dark Mode
4. **Clear History**: Settings → Clear Chat History (messages disappear immediately on returning to chat)
5. **View Info**: Settings → About

## Error Handling

The app handles various error scenarios:
- Invalid API key
- Rate limit exceeded (temporary throttling)
- Network errors
- Server errors

Error messages are displayed to the user with actionable information.

## Privacy & Security

- Chat history is stored locally on your device
- Messages are sent to Groq Cloud's API for processing
- No personal information is collected
- API keys should be kept secure and never committed to version control

## Dependencies

- `react-native`: Core framework
- `@react-navigation/native`: Navigation
- `react-native-paper`: UI components
- `react-native-vector-icons`: Icons
- `axios`: HTTP client for API calls
- `@react-native-async-storage/async-storage`: Local storage
- `react-native-safe-area-context`: Safe area handling
- `@react-navigation/native-stack`: Navigation stack implementation

## Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in `src/config/apiConfig.ts`
- Verify your Groq account has an active key (free tier available)
- Groq rate limits are generous; if you hit them, wait and retry

### Clearing History Appears Delayed
- The chat screen reloads history whenever it regains focus. After clearing history in Settings, simply return to the chat screen—the conversation will be empty.

### Build Issues
- **Android**: Clean build with `cd android && ./gradlew clean && cd ..`
- **iOS**: Run `cd ios && pod install && cd ..`
- Clear Metro cache: `npm start -- --reset-cache`

### Vector Icons Not Showing
- **Android**: Ensure `fonts.gradle` is applied in `android/app/build.gradle`
- **iOS**: Run `pod install` in the `ios` directory

### Switch Back to OpenAI
- Update `src/services/openaiService.ts` to use `https://api.openai.com/v1/chat/completions`
- Change the model to `gpt-3.5-turbo`
- Replace `GROQ_API_KEY` with `OPENAI_API_KEY`

## Future Enhancements

- User authentication
- Multiple chat threads
- Voice input/output
- Advanced AI model selection
- Export chat history

## License

This project is open source and available for personal and commercial use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on the repository.

---

Built with ❤️ using React Native and Groq Cloud
