import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types';
import { useTheme } from '../context/ThemeContext';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { colors } = useTheme();
  const isUser = message.role === 'user';

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser
            ? { backgroundColor: colors.userBubble }
            : { backgroundColor: colors.aiBubble },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: colors.text },
          ]}
        >
          {message.text}
        </Text>
      </View>
      <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
        {formatTime(message.timestamp)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
    paddingHorizontal: 4,
  },
});

