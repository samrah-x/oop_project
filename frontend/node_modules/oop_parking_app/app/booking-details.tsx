"use client"

import { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import BottomNavbar from "../components/BottomNavbar"
// Note: You'll need to install this package
// npm install react-native-qrcode-svg
import QRCode from "react-native-qrcode-svg"

// Define TypeScript interfaces for our data
interface BookingDetails {
  id: string
  parkingArea: string
  slot: string
  date: string
  startTime: string
  endTime: string
  status: "active" | "completed" | "cancelled"
  price: string
  paymentMethod: string
  bookingCode: string
}

export default function BookingDetailsScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // API endpoint configuration
  const API_BASE_URL = "https://your-backend-api.com"

  /**
   * Fetch booking details from backend
   */
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return

      try {
        setLoading(true)
        setError(null)

        // In a real implementation, use actual API call
        // const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`);
        // if (!response.ok) throw new Error('Failed to fetch booking details');
        // const data = await response.json();

        // For demo purposes only - replace with actual API call
        setTimeout(() => {
          const mockBooking: BookingDetails = {
            id: bookingId,
            parkingArea: "PARKING AREA A",
            slot: "SLOT A2",
            date: "May 1, 2023",
            startTime: "10:00 AM",
            endTime: "12:00 PM",
            status: "active",
            price: "$5.00",
            paymentMethod: "Credit Card",
            bookingCode: "PARK12345",
          }

          setBooking(mockBooking)
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Error fetching booking details:", err)
        setError("Failed to load booking details")
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [bookingId])

  /**
   * Handle booking cancellation
   */
  const handleCancelBooking = () => {
    Alert.alert("Cancel Booking", "Are you sure you want to cancel this booking?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            setLoading(true)

            // In a real implementation, make an actual API call
            // const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
            //   method: 'DELETE'
            // });
            // if (!response.ok) throw new Error('Failed to cancel booking');

            // For demo purposes only
            setTimeout(() => {
              setLoading(false)

              Alert.alert("Booking Cancelled", "Your booking has been successfully cancelled.", [
                {
                  text: "OK",
                  onPress: () => router.push("/booking-history"),
                },
              ])
            }, 1000)
          } catch (err) {
            console.error("Error cancelling booking:", err)
            Alert.alert("Error", "Failed to cancel booking. Please try again.")
            setLoading(false)
          }
        },
      },
    ])
  }

  /**
   * Handle extending booking time
   */
  const handleExtendBooking = () => {
    Alert.alert("Extend Booking", "How long would you like to extend your booking?", [
      {
        text: "30 minutes",
        onPress: () => {
          // In a real implementation, make an actual API call
          Alert.alert("Success", "Your booking has been extended by 30 minutes.")
          // Update the booking end time
          if (booking) {
            setBooking({
              ...booking,
              endTime: "12:30 PM",
            })
          }
        },
      },
      {
        text: "1 hour",
        onPress: () => {
          // In a real implementation, make an actual API call
          Alert.alert("Success", "Your booking has been extended by 1 hour.")
          // Update the booking end time
          if (booking) {
            setBooking({
              ...booking,
              endTime: "1:00 PM",
            })
          }
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A00E0" />
          <Text style={styles.loadingText}>Loading booking details...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : booking ? (
        <ScrollView style={styles.content}>
          <View style={styles.qrContainer}>
            <QRCode value={booking.bookingCode} size={200} color="#000" backgroundColor="#fff" />
            <Text style={styles.bookingCode}>{booking.bookingCode}</Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  booking.status === "active"
                    ? styles.activeBadge
                    : booking.status === "completed"
                      ? styles.completedBadge
                      : styles.cancelledBadge,
                ]}
              >
                <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Parking Area</Text>
              <Text style={styles.detailValue}>{booking.parkingArea}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Slot</Text>
              <Text style={styles.detailValue}>{booking.slot}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{booking.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>
                {booking.startTime} - {booking.endTime}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>{booking.price}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>{booking.paymentMethod}</Text>
            </View>
          </View>

          {booking.status === "active" && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.extendButton} onPress={handleExtendBooking}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Extend Time</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelBooking}>
                <Ionicons name="close-circle-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomSpace} />
        </ScrollView>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Booking not found</Text>
        </View>
      )}

      <BottomNavbar currentRoute="history" />
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#111",
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#ccc",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4A00E0",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  qrContainer: {
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  bookingCode: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  detailsCard: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  detailLabel: {
    fontSize: 14,
    color: "#aaa",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: "#4A00E0",
  },
  completedBadge: {
    backgroundColor: "#4CAF50",
  },
  cancelledBadge: {
    backgroundColor: "#F44336",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  extendButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A00E0",
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F44336",
    borderRadius: 8,
    padding: 12,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  bottomSpace: {
    height: 80,
  },
})
