import { Ionicons } from "@expo/vector-icons"

interface IconSymbolProps {
  name: keyof typeof Ionicons.glyphMap
  color: string
  focused: boolean
  size?: number
}

export function IconSymbol({ name, color, focused, size = 24 }: IconSymbolProps) {
  return <Ionicons name={name} size={size} color={color} />
}
