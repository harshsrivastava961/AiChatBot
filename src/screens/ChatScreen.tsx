import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Message } from '../types';
import { useTheme } from '../context/ThemeContext';
import { MessageBubble } from '../components/MessageBubble';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { sendMessageToOpenAI } from '../services/openaiService';
import { saveChatHistory, loadChatHistory } from '../services/storageService';

export const ChatScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const keyboardOffset = Platform.OS === 'ios' ? insets.top + 48 : 0;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      loadMessages();
    }, []),
  );

  useEffect(() => {
    // Auto-scroll to bottom when new message arrives
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const loadMessages = async () => {
    try {
      const history = await loadChatHistory();
      setMessages(history);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) {
      return;
    }

    const userMessageText = inputText.trim();
    setInputText('');
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      role: 'user',
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      // Prepare messages for OpenAI API
      const apiMessages = newMessages.map(msg => ({
        role: msg.role,
        content: msg.text,
      }));

      const response = await sendMessageToOpenAI(apiMessages);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        role: 'assistant',
        timestamp: Date.now(),
      };

      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);
      await saveChatHistory(updatedMessages);
    } catch (error: any) {
      console.error('Error sending message:', error);

      // Remove the user message if API call failed
      setMessages(messages);

      // Show user-friendly error message
      const errorMessage =
        error.message || 'Failed to send message. Please try again.';

      // Special handling for rate limit errors
      if (
        errorMessage.includes('Rate limit') ||
        errorMessage.includes('quota')
      ) {
        Alert.alert(
          'Rate Limit Exceeded',
          'You have reached your OpenAI API rate limit or quota. This could mean:\n\n' +
            "• You've used all your free tier credits\n" +
            "• You're making requests too quickly\n" +
            '• Your account needs billing setup\n\n' +
            'Please check your OpenAI account at platform.openai.com or try again later.',
          [
            { text: 'OK', style: 'default' },
            {
              text: 'Check Account',
              onPress: () => {
                // You can add a link to OpenAI dashboard here if needed
              },
            },
          ],
        );
      } else {
        Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardOffset}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            AI ChatBot
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsButton}
          >
            <Icon name="settings" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Start a conversation with AI...
              </Text>
            </View>
          }
        />

        {/* Loading Indicator */}
        {isLoading && <LoadingIndicator />}

        {/* Input Bar */}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: colors.surface, borderTopColor: colors.border },
            { paddingBottom: Math.max(12, insets.bottom + 8) },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            multiline
            maxLength={1000}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  inputText.trim() && !isLoading
                    ? colors.primary
                    : colors.border,
              },
            ]}
          >
            <Icon
              name="send"
              size={20}
              color={
                inputText.trim() && !isLoading
                  ? '#ffffff'
                  : colors.textSecondary
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 4,
  },
  messagesList: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
