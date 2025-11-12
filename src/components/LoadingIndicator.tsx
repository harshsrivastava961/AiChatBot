import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const LoadingIndicator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bubble,
          { backgroundColor: colors.aiBubble },
        ]}
      >
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  bubble: {
    padding: 16,
    borderRadius: 18,
  },
});

