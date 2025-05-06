import type React from "react"
import { View, StyleSheet, type ViewProps } from "react-native"

interface CardProps extends ViewProps {
  variant?: "elevated" | "outlined" | "filled"
  padding?: number
}

export const Card: React.FC<CardProps> = ({ children, variant = "elevated", padding = 16, style, ...props }) => {
  const getCardStyle = () => {
    switch (variant) {
      case "elevated":
        return styles.elevatedCard
      case "outlined":
        return styles.outlinedCard
      case "filled":
        return styles.filledCard
      default:
        return styles.elevatedCard
    }
  }

  return (
    <View style={[styles.card, getCardStyle(), { padding }, style]} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  elevatedCard: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outlinedCard: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filledCard: {
    backgroundColor: "#F5F5F5",
  },
})
