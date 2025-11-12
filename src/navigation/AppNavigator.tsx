import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AboutScreen } from '../screens/AboutScreen';

export type RootStackParamList = {
  Splash: undefined;
  Chat: undefined;
  Settings: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Chat"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

