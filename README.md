# AI ChatBot - React Native App

A simple AI-powered chatbot application built with React Native, featuring OpenAI's GPT-3.5-turbo integration. This app provides a clean, modern chat interface with dark mode support, persistent chat history, and smooth user experience.

## Features

- 🤖 **AI Chat Interface**: Conversational AI powered by OpenAI's Chat Completion API
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
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Configure OpenAI API Key**:
   
   Open `src/config/apiConfig.ts` and replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API key:
   ```typescript
   export const OPENAI_API_KEY = 'sk-your-actual-api-key-here';
   ```
   
   ⚠️ **Important**: Never commit your API key to version control. The `apiConfig.ts` file should be kept private.

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
│   │   ├── openaiService.ts
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

The app uses OpenAI's Chat Completion API. To configure:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Update `src/config/apiConfig.ts` with your key
3. The app uses GPT-3.5-turbo model by default (free tier compatible)

### Theme Customization

Colors can be customized in `src/theme/colors.ts`. The app supports:
- Light theme (default)
- Dark theme (toggleable in Settings)

## Usage

1. **Start a Conversation**: Type a message in the input field and tap send
2. **View History**: All conversations are automatically saved locally
3. **Change Theme**: Go to Settings → Toggle Dark Mode
4. **Clear History**: Settings → Clear Chat History
5. **View Info**: Settings → About

## Error Handling

The app handles various error scenarios:
- Invalid API key
- Rate limit exceeded (free tier quota)
- Network errors
- Server errors

Error messages are displayed to the user with actionable information.

## Privacy & Security

- Chat history is stored locally on your device
- Messages are sent to OpenAI's API for processing
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

## Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in `src/config/apiConfig.ts`
- Verify your OpenAI account has available credits
- Check for rate limit errors (free tier has usage limits)

### Build Issues
- **Android**: Clean build with `cd android && ./gradlew clean && cd ..`
- **iOS**: Run `cd ios && pod install && cd ..`
- Clear Metro cache: `npm start -- --reset-cache`

### Vector Icons Not Showing
- **Android**: Ensure `fonts.gradle` is applied in `android/app/build.gradle`
- **iOS**: Run `pod install` in the `ios` directory

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

Built with ❤️ using React Native
