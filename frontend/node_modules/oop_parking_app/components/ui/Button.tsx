import type React from "react"
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  type TouchableOpacityProps,
} from "react-native"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "small" | "medium" | "large"
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  disabled,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButton
      case "outline":
        return styles.outlineButton
      case "ghost":
        return styles.ghostButton
      case "danger":
        return styles.dangerButton
      case "primary":
      default:
        return styles.primaryButton
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryText
      case "outline":
        return styles.outlineText
      case "ghost":
        return styles.ghostText
      case "danger":
        return styles.dangerText
      case "primary":
      default:
        return styles.primaryText
    }
  }

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallButton
      case "large":
        return styles.largeButton
      case "medium":
      default:
        return styles.mediumButton
    }
  }

  const getTextSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallText
      case "large":
        return styles.largeText
      case "medium":
      default:
        return styles.mediumText
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        fullWidth ? styles.fullWidth : null,
        disabled ? styles.disabledButton : null,
        style,
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost" ? "#0047AB" : "white"
          }
        />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text
            style={[
              getTextStyle(),
              getTextSizeStyle(),
              disabled ? styles.disabledText : null,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#0047AB",
  },
  secondaryButton: {
    backgroundColor: "#E0E0E0",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#0047AB",
  },
  ghostButton: {
    backgroundColor: "transparent",
  },
  dangerButton: {
    backgroundColor: "#FF3B30",
  },
  disabledButton: {
    opacity: 0.5,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  primaryText: {
    color: "white",
    fontWeight: "600",
  },
  secondaryText: {
    color: "#333",
    fontWeight: "600",
  },
  outlineText: {
    color: "#0047AB",
    fontWeight: "600",
  },
  ghostText: {
    color: "#0047AB",
    fontWeight: "600",
  },
  dangerText: {
    color: "white",
    fontWeight: "600",
  },
  disabledText: {
    opacity: 0.7,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  fullWidth: {
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
})

