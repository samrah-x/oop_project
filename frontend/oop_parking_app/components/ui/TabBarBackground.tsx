import { View, StyleSheet } from "react-native"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"

export default function TabBarBackground() {
  const colorScheme = useColorScheme()
  const backgroundColor = colorScheme === "dark" ? Colors.dark.background : Colors.light.background

  return <View style={[styles.background, { backgroundColor }]} />
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
