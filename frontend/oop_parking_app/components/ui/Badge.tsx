import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface BadgeProps {
  label: string
  variant?: "primary" | "success" | "warning" | "error" | "info" | "default"
  size?: "small" | "medium" | "large"
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = "default", size = "medium" }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return "#0047AB"
      case "success":
        return "#34C759"
      case "warning":
        return "#FF9500"
      case "error":
        return "#FF3B30"
      case "info":
        return "#5AC8FA"
      default:
        return "#E0E0E0"
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case "default":
        return "#333"
      default:
        return "white"
    }
  }

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.small
      case "medium":
        return styles.medium
      case "large":
        return styles.large
      default:
        return styles.medium
    }
  }

  const getTextSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallText
      case "medium":
        return styles.mediumText
      case "large":
        return styles.largeText
      default:
        return styles.mediumText
    }
  }

  return (
    <View style={[styles.badge, getSizeStyle(), { backgroundColor: getBackgroundColor() }]}>
      <Text style={[styles.text, getTextSizeStyle(), { color: getTextColor() }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 100,
    alignSelf: "flex-start",
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    fontWeight: "600",
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
})
