import { Text, type TextProps, useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"

export interface ThemedTextProps extends TextProps {
  lightColor?: string
  darkColor?: string
}

export function ThemedText({ style, lightColor, darkColor, ...props }: ThemedTextProps) {
  const colorScheme = useColorScheme()
  const color = colorScheme === "dark" ? (darkColor ?? Colors.dark.text) : (lightColor ?? Colors.light.text)

  return <Text style={[{ color }, style]} {...props} />
}
