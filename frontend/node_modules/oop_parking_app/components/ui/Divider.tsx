import type React from "react"
import { View, StyleSheet } from "react-native"

interface DividerProps {
  direction?: "horizontal" | "vertical"
  thickness?: number
  color?: string
  style?: any
}

export const Divider: React.FC<DividerProps> = ({
  direction = "horizontal",
  thickness = 1,
  color = "#E0E0E0",
  style,
}) => {
  return (
    <View
      style={[
        direction === "horizontal" ? styles.horizontal : styles.vertical,
        { [direction === "horizontal" ? "height" : "width"]: thickness, backgroundColor: color },
        style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  horizontal: {
    width: "100%",
    marginVertical: 8,
  },
  vertical: {
    height: "100%",
    marginHorizontal: 8,
  },
})
