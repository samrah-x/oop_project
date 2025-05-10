import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import BottomNavbar from "../components/BottomNavbar"

export default function BookingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parking Booking</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard} onPress={() => router.push("/available-slots")}>
            <View style={styles.iconContainer}>
              <Ionicons name="car" size={50} color="#fff" />
            </View>
            <Text style={styles.optionTitle}>Available Slots</Text>
            <Text style={styles.optionDescription}>Find and book available parking slots in real-time</Text>
            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-forward-circle" size={30} color="#4A00E0" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={() => router.push("/booking-history")}>
            <View style={styles.iconContainer}>
              <Ionicons name="time" size={50} color="#fff" />
            </View>
            <Text style={styles.optionTitle}>Booking History</Text>
            <Text style={styles.optionDescription}>View your past and current parking bookings</Text>
            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-forward-circle" size={30} color="#4A00E0" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.recentActivityCard}>
            <Ionicons name="information-circle" size={24} color="#4A00E0" />
            <Text style={styles.recentActivityText}>
              Your booking data will appear here once you make your first booking
            </Text>
          </View>
        </View>
      </View>

      <BottomNavbar currentRoute="booking" />
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#111",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionCard: {
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    position: "relative",
    borderLeftWidth: 4,
    borderLeftColor: "#4A00E0",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A00E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
    width: "80%",
  },
  arrowContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  recentSection: {
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  recentActivityCard: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  recentActivityText: {
    color: "#ccc",
    marginLeft: 10,
    flex: 1,
  },
})
