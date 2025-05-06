import type React from "react"
import { Text as RNText, StyleSheet, type TextProps as RNTextProps } from "react-native"

interface TextProps extends RNTextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption" | "button" | "overline"
  weight?: "normal" | "medium" | "semibold" | "bold"
  color?: string
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  weight = "normal",
  color = "#333",
  style,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "h1":
        return styles.h1
      case "h2":
        return styles.h2
      case "h3":
        return styles.h3
      case "h4":
        return styles.h4
      case "h5":
        return styles.h5
      case "h6":
        return styles.h6
      case "body":
        return styles.body
      case "caption":
        return styles.caption
      case "button":
        return styles.button
      case "overline":
        return styles.overline
      default:
        return styles.body
    }
  }

  const getWeightStyle = () => {
    switch (weight) {
      case "normal":
        return styles.weightNormal
      case "medium":
        return styles.weightMedium
      case "semibold":
        return styles.weightSemibold
      case "bold":
        return styles.weightBold
      default:
        return styles.weightNormal
    }
  }

  return (
    <RNText style={[getVariantStyle(), getWeightStyle(), { color }, style]} {...props}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    lineHeight: 26,
  },
  h6: {
    fontSize: 16,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  overline: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  weightNormal: {
    fontWeight: "400",
  },
  weightMedium: {
    fontWeight: "500",
  },
  weightSemibold: {
    fontWeight: "600",
  },
  weightBold: {
    fontWeight: "700",
  },
})
