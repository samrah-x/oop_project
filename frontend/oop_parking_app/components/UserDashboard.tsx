import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { router } from "expo-router"

export default function UserDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CURRENT BOOKING</Text>
          <View style={styles.bookingCard}>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingLocation}>PARKING AREA A</Text>
              <Text style={styles.bookingSlot}>SLOT A2</Text>
            </View>
            <FontAwesome5 name="car" size={24} color="#000" style={styles.carIcon} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FUTURE BOOKING</Text>
          <View style={styles.bookingCard}>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingLocation}>PARKING AREA B</Text>
              <Text style={styles.bookingSlot}>SLOT B5</Text>
            </View>
            <FontAwesome5 name="car" size={24} color="#000" style={styles.carIcon} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREVIOUS BOOKING</Text>
          <View style={styles.bookingCard}>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingLocation}>PARKING AREA C</Text>
              <Text style={styles.bookingSlot}>SLOT C3</Text>
            </View>
            <FontAwesome5 name="car" size={24} color="#000" style={styles.carIcon} />
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/parking-space")}>
            <Text style={styles.actionButtonText}>Available Slots</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/(tabs)/bookings")}>
            <Text style={styles.actionButtonText}>Booking History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#666",
  },
  bookingCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingLocation: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookingSlot: {
    fontSize: 14,
    color: "#666",
  },
  carIcon: {
    marginLeft: 10,
  },
  actionButtons: {
    marginTop: 10,
    marginBottom: 80,
  },
  actionButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    fontWeight: "bold",
  },
})
