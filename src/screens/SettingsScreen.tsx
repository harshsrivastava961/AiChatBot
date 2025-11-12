import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { clearChatHistory } from '../services/storageService';

export const SettingsScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { colors, theme, toggleTheme } = useTheme();

  const handleClearHistory = () => {
    Alert.alert(
      'Clear Chat History',
      'Are you sure you want to clear all chat history? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearChatHistory();
              Alert.alert('Success', 'Chat history cleared successfully.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear chat history.');
            }
          },
        },
      ],
    );
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Settings
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Settings Content */}
      <View style={styles.content}>
        {/* Theme Toggle */}
        <View
          style={[
            styles.settingItem,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.settingLeft}>
            <Icon name="dark-mode" size={24} color={colors.text} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Dark Mode
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.textSecondary },
                ]}
              >
                Toggle between light and dark theme
              </Text>
            </View>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>

        {/* Clear History */}
        <TouchableOpacity
          style={[
            styles.settingItem,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
          onPress={handleClearHistory}
        >
          <View style={styles.settingLeft}>
            <Icon name="delete-outline" size={24} color={colors.error} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Clear Chat History
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.textSecondary },
                ]}
              >
                Delete all conversation history
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          style={[
            styles.settingItem,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
          onPress={() => navigation.navigate('About')}
        >
          <View style={styles.settingLeft}>
            <Icon name="info-outline" size={24} color={colors.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                About
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.textSecondary },
                ]}
              >
                App information and privacy
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    paddingTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
});
