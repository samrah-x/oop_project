import type React from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import { Text } from "./Text"

interface SpinnerProps {
  size?: "small" | "large"
  color?: string
  text?: string
  fullScreen?: boolean
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "large", color = "#0047AB", text, fullScreen = false }) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={styles.text} variant="caption" color="#666">
          {text}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 999,
  },
  text: {
    marginTop: 8,
  },
})
