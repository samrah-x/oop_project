"use client"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import QRCode from "react-native-qrcode-svg"
import BottomNavbar from "../components/BottomNavbar"

export default function BookingConfirmation() {
  const params = useLocalSearchParams<{ slotId: string; areaName: string }>()
  const { slotId, areaName } = params

  console.log("Slot ID:", slotId);
  console.log("Area Name:", areaName);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successContainer}>
          <QRCode
            value={JSON.stringify({
              slotId,
              areaName,
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
            })}
            size={200}
            color="#000"
            backgroundColor="#fff"
          />

          <Text style={styles.successTitle}>Your parking slot {slotId}</Text>
          <Text style={styles.successText}>is successfully booked!</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>{areaName || "Main Building"}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>{new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time:</Text>
              <Text style={styles.detailValue}>{new Date().toLocaleTimeString()}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.homeButton} onPress={() => router.replace("/")}>
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavbar currentRoute="booking" />
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 30,
    shadowColor: "#4A00E0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 30,
    textAlign: "center",
  },
  successText: {
    fontSize: 18,
    color: "#4A00E0",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 30,
    textAlign: "center",
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  detailLabel: {
    fontSize: 16,
    color: "#aaa",
  },
  detailValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  homeButton: {
    backgroundColor: "#4A00E0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
