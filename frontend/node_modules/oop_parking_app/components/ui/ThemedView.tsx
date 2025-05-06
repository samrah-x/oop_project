import { View, type ViewProps, useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"

export interface ThemedViewProps extends ViewProps {
  lightColor?: string
  darkColor?: string
}

export function ThemedView({ style, lightColor, darkColor, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme()
  const backgroundColor =
    colorScheme === "dark" ? (darkColor ?? Colors.dark.background) : (lightColor ?? Colors.light.background)

  return <View style={[{ backgroundColor }, style]} {...props} />
}
