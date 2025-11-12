import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const AboutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <Text style={[styles.title, { color: colors.text }]}>AI ChatBot</Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>
            Version 1.0.0
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About This App
          </Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            A simple AI-powered chatbot application built with React Native.
            This app uses Groq Cloud's OpenAI-compatible API to provide fast
            conversational AI capabilities.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Powered by Groq Cloud
          </Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            This app uses Groq Cloud's fast Llama 3.1 models to generate
            responses. Groq provides a free tier with generous rate limits and
            very fast responses.
          </Text>
          <TouchableOpacity
            onPress={() => openLink('https://console.groq.com')}
            style={styles.linkButton}
          >
            <Text style={[styles.linkText, { color: colors.primary }]}>
              Visit Groq Console ↗
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Privacy & Security
          </Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            • Your conversations are stored locally on your device{'\n'}•
            Messages are sent to Groq's API for processing{'\n'}• No personal
            information is collected or transmitted{'\n'}• API keys are stored
            securely and never exposed{'\n'}• You can clear your chat history at
            any time
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Rate Limiting
          </Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            Groq Cloud offers a generous free tier with high rate limits. If you
            encounter rate limit errors, wait a moment and try again. The free
            tier should be sufficient for most usage.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Open Source
          </Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            This app is built using open-source technologies including React
            Native, React Navigation, and other community libraries.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  linkButton: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
