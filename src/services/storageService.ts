import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message, ChatHistory } from '../types';

const CHAT_HISTORY_KEY = '@chat_history';

export const saveChatHistory = async (messages: Message[]): Promise<void> => {
  try {
    const history: ChatHistory = {
      messages,
      lastUpdated: Date.now(),
    };
    await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat history:', error);
    throw error;
  }
};

export const loadChatHistory = async (): Promise<Message[]> => {
  try {
    const data = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
    if (data) {
      const history: ChatHistory = JSON.parse(data);
      return history.messages || [];
    }
    return [];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
};

export const clearChatHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
    throw error;
  }
};

