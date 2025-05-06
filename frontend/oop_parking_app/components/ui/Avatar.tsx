import type React from "react"
import { View, Image, Text, StyleSheet } from "react-native"

interface AvatarProps {
  source?: { uri: string } | null
  name?: string
  size?: "small" | "medium" | "large" | number
  backgroundColor?: string
  textColor?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = "medium",
  backgroundColor = "#0047AB",
  textColor = "white",
}) => {
  const getSize = () => {
    if (typeof size === "number") {
      return size
    }

    switch (size) {
      case "small":
        return 32
      case "medium":
        return 48
      case "large":
        return 64
      default:
        return 48
    }
  }

  const getFontSize = () => {
    if (typeof size === "number") {
      return size / 2.5
    }

    switch (size) {
      case "small":
        return 12
      case "medium":
        return 18
      case "large":
        return 24
      default:
        return 18
    }
  }

  const getInitials = () => {
    if (!name) return ""
    const nameParts = name.split(" ")
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase()
    }
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
  }

  const avatarSize = getSize()

  return (
    <View
      style={[
        styles.container,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: source ? "transparent" : backgroundColor,
        },
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          }}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: getFontSize(), color: textColor }]}>{getInitials()}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  initials: {
    fontWeight: "600",
  },
})
