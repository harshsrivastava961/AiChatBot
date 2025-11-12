export interface Message {
  id: string;
  text: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatHistory {
  messages: Message[];
  lastUpdated: number;
}

export type Theme = 'light' | 'dark';

