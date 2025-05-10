import { TouchableOpacity, type TouchableOpacityProps } from "react-native"
import * as Haptics from "expo-haptics"

interface HapticTabProps extends TouchableOpacityProps {
  hapticFeedback?: boolean
  feedbackStyle?: "light" | "medium" | "heavy"
}

export function HapticTab({
  hapticFeedback = true,
  feedbackStyle = "light",
  onPress,
  children,
  ...props
}: HapticTabProps) {
  const handlePress = (e: any) => {
    if (hapticFeedback) {
      switch (feedbackStyle) {
        case "light":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          break
        case "medium":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          break
        case "heavy":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          break
      }
    }

    if (onPress) {
      onPress(e)
    }
  }

  return (
    <TouchableOpacity {...props} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  )
}
