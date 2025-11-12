# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure OpenAI API Key**
   
   Open `src/config/apiConfig.ts` and replace the placeholder:
   ```typescript
   export const OPENAI_API_KEY = 'sk-your-actual-key-here';
   ```
   
   Get your API key from: https://platform.openai.com/api-keys

3. **iOS Setup** (iOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Run the App**
   ```bash
   # Start Metro
   npm start
   
   # In another terminal, run:
   npm run android  # for Android
   npm run ios      # for iOS
   ```

## Detailed Setup

### Prerequisites

- Node.js >= 20
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

### Step-by-Step

#### 1. Install Node Dependencies
```bash
npm install
```

#### 2. Configure API Key

Edit `src/config/apiConfig.ts`:
```typescript
export const OPENAI_API_KEY = 'your-openai-api-key';
```

**Important Security Notes:**
- Never commit your API key to version control
- For production apps, consider using:
  - Backend proxy server
  - Secure storage solutions
  - Environment variable management tools

#### 3. iOS Setup

If you're building for iOS:

```bash
# Install CocoaPods dependencies
cd ios
bundle install
bundle exec pod install
cd ..
```

#### 4. Android Setup

Android should work out of the box with React Native CLI. If you encounter issues:

```bash
cd android
./gradlew clean
cd ..
```

#### 5. Run the App

**Start Metro Bundler:**
```bash
npm start
```

**Run on Device/Emulator:**

Android:
```bash
npm run android
```

iOS:
```bash
npm run ios
```

## Troubleshooting

### Vector Icons Not Showing

**Android:**
- The `fonts.gradle` is already configured in `android/app/build.gradle`
- If icons still don't show, try: `cd android && ./gradlew clean && cd ..`

**iOS:**
- Ensure `pod install` was run successfully
- Check that `Info.plist` includes the MaterialIcons font entry

### API Key Issues

- Verify the key is correctly set in `src/config/apiConfig.ts`
- Check that your OpenAI account has available credits
- Ensure there are no extra spaces or quotes around the key

### Build Errors

**Android:**
```bash
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

**iOS:**
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

### Metro Cache Issues

```bash
npm start -- --reset-cache
```

## Next Steps

- Customize colors in `src/theme/colors.ts`
- Modify chat behavior in `src/screens/ChatScreen.tsx`
- Adjust API settings in `src/services/openaiService.ts`

## Need Help?

- Check the main README.md for more information
- Review React Native documentation: https://reactnative.dev
- OpenAI API documentation: https://platform.openai.com/docs

