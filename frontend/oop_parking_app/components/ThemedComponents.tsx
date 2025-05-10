import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, useColorScheme } from 'react-native';

// Define theme colors
const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#0047AB', // Dark Blue
    secondary: '#E8E8E8',
    border: '#CCCCCC',
    link: '#0066CC',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    primary: '#4B9CD3', // Lighter Blue for dark mode
    secondary: '#333333',
    border: '#555555',
    link: '#5B9BD5',
  },
};

// ThemedView Props
interface ThemedViewProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'default';
}

// ThemedText Props
interface ThemedTextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  type?: 'title' | 'subtitle' | 'body' | 'link' | 'caption';
}

// ThemedView Component
export const ThemedView: React.FC<ThemedViewProps> = ({ 
  style, 
  children, 
  variant = 'default' 
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  let backgroundColor;
  switch (variant) {
    case 'primary':
      backgroundColor = theme.primary;
      break;
    case 'secondary':
      backgroundColor = theme.secondary;
      break;
    default:
      backgroundColor = theme.background;
  }
  
  return (
    <View 
      style={[
        { backgroundColor },
        styles.view,
        style
      ]}
    >
      {children}
    </View>
  );
};

// ThemedText Component
export const ThemedText: React.FC<ThemedTextProps> = ({ 
  style, 
  children, 
  type = 'body' 
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  let textStyle: TextStyle = { color: theme.text };
  
  switch (type) {
    case 'title':
      textStyle = { ...textStyle, ...styles.title };
      break;
    case 'subtitle':
      textStyle = { ...textStyle, ...styles.subtitle };
      break;
    case 'link':
      textStyle = { ...textStyle, color: theme.link, ...styles.link };
      break;
    case 'caption':
      textStyle = { ...textStyle, ...styles.caption };
      break;
    default:
      textStyle = { ...textStyle, ...styles.body };
  }
  
  return (
    <Text style={[textStyle, style]}>
      {children}
    </Text>
  );
};

// Common styles
const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  body: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  caption: {
    fontSize: 14,
    opacity: 0.8,
  },
});