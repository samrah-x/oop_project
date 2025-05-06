import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

interface BottomNavbarProps {
  currentRoute: string
}

export default function BottomNavbar({ currentRoute }: BottomNavbarProps) {
  const navItems = [
    { name: "home", icon: "home", label: "Home", route: "/" },
    { name: "booking", icon: "car", label: "Booking", route: "/booking-screen" },
    { name: "history", icon: "time", label: "History", route: "/booking-history" },
    { name: "profile", icon: "person", label: "Profile", route: "/profile" },
  ]

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity key={item.name} style={styles.navItem} onPress={() => router.push(item.route as "/" | "/booking-screen" | "/booking-history" | "/notifications" | "/profile")}>
          <Ionicons
            name={currentRoute === item.name ? item.icon as keyof typeof Ionicons.glyphMap : `${item.icon}-outline` as keyof typeof Ionicons.glyphMap}
            size={24}
            color={currentRoute === item.name ? "#4A00E0" : "#fff"}
          />
          <Text style={[styles.navLabel, { color: currentRoute === item.name ? "#4A00E0" : "#ccc" }]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
})
