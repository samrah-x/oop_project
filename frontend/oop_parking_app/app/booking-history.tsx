"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import BottomNavbar from "../components/BottomNavbar"

// Define TypeScript interfaces for our data
interface Booking {
  id: string
  date: string
  location: string
  parkingArea: string
  slot: string
  startTime: string
  endTime: string
  status: "active" | "completed" | "cancelled"
}

export default function BookingHistory() {
  // State for bookings data
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // API endpoint configuration
  const API_BASE_URL = "https://your-backend-api.com"

  /**
   * Fetch booking history from backend
   */
  const fetchBookingHistory = async () => {
    try {
      setError(null)

      // In a real implementation, use actual API call
      // const response = await fetch(`${API_BASE_URL}/api/bookings/history`);
      // if (!response.ok) throw new Error('Failed to fetch booking history');
      // const data = await response.json();

      // For demo purposes only - replace with actual API call
      setTimeout(() => {
        const data: Booking[] = [
          {
            id: "1",
            date: "17 Feb 2025",
            location: "Main Building",
            parkingArea: "PARKING AREA A",
            slot: "SLOT A2",
            startTime: "10:00 AM",
            endTime: "12:00 PM",
            status: "active",
          },
          {
            id: "2",
            date: "17 Feb 2025",
            location: "East Wing",
            parkingArea: "PARKING AREA B",
            slot: "SLOT B5",
            startTime: "2:00 PM",
            endTime: "4:00 PM",
            status: "active",
          },
          {
            id: "3",
            date: "15 Feb 2025",
            location: "West Wing",
            parkingArea: "PARKING AREA C",
            slot: "SLOT C3",
            startTime: "9:00 AM",
            endTime: "11:00 PM",
            status: "completed",
          },
          {
            id: "4",
            date: "15 Feb 2025",
            location: "Main Building",
            parkingArea: "PARKING AREA A",
            slot: "SLOT A1",
            startTime: "1:00 PM",
            endTime: "3:00 PM",
            status: "completed",
          },
        ]

        setBookings(data)
      }, 1000)
    } catch (err) {
      console.error("Error fetching booking history:", err)
      setError("Failed to load your booking history. Please try again.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  /**
   * Fetch bookings when component mounts
   */
  useEffect(() => {
    fetchBookingHistory()

    // Set up real-time updates with WebSocket
    const setupRealTimeUpdates = () => {
      // In a real implementation, use actual WebSocket connection
      // const ws = new WebSocket('wss://your-backend-api.com/ws');
      // ws.onmessage = (event) => {
      //   const data = JSON.parse(event.data);
      //   if (data.type === 'BOOKING_UPDATE') {
      //     updateBookingStatus(data.bookingId, data.status);
      //   }
      // };
      // return () => ws.close();
    }

    const cleanup = setupRealTimeUpdates()
    return cleanup
  }, [])

  /**
   * Update booking status when receiving real-time updates
   */
  const updateBookingStatus = (bookingId: string, status: "active" | "completed" | "cancelled") => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)),
    )
  }

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = () => {
    setRefreshing(true)
    fetchBookingHistory()
  }

  /**
   * Handle booking cancellation
   */
  const handleCancelBooking = async (bookingId: string) => {
    try {
      // In a real implementation, make an actual API call
      // const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
      //   method: 'DELETE'
      // });
      // if (!response.ok) throw new Error('Failed to cancel booking');

      // For demo purposes only
      setTimeout(() => {
        // Update local state to reflect cancellation
        updateBookingStatus(bookingId, "cancelled")

        Alert.alert("Booking Cancelled", "Your booking has been successfully cancelled.", [{ text: "OK" }])
      }, 500)
    } catch (err) {
      console.error("Error cancelling booking:", err)
      Alert.alert("Error", "Failed to cancel booking. Please try again.")
    }
  }

  /**
   * Navigate to booking details
   */
  const handleViewBooking = (bookingId: string) => {
    router.push({
      pathname: "/booking-details",
      params: { bookingId },
    })
  }

  /**
   * Render a booking item in the list
   */
  const renderBookingItem = ({ item }: { item: Booking }) => {
    return (
      <TouchableOpacity style={styles.bookingCard} onPress={() => handleViewBooking(item.id)}>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingDate}>{item.date}</Text>
          <View
            style={[
              styles.statusBadge,
              item.status === "active"
                ? styles.activeBadge
                : item.status === "completed"
                  ? styles.completedBadge
                  : styles.cancelledBadge,
            ]}
          >
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.carIconContainer}>
            <Ionicons name="car" size={30} color="#fff" />
          </View>

          <View style={styles.detailsContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Picked up</Text>
              <Text style={styles.detailText}>{item.startTime}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailText}>{item.location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking History</Text>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A00E0" />
          <Text style={styles.loadingText}>Loading your booking history...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchBookingHistory}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={80} color="#666" />
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptySubtitle}>Your booking history will appear here</Text>
          <TouchableOpacity style={styles.bookNowButton} onPress={() => router.push("/available-slots")}>
            <Text style={styles.bookNowButtonText}>Book a Slot</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      <BottomNavbar currentRoute="history" />
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")
const isSmallDevice = width < 375

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
    padding: 5,
    marginRight: 15,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 15,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 25,
    textAlign: "center",
  },
  bookNowButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#4A00E0",
    borderRadius: 10,
  },
  bookNowButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    padding: isSmallDevice ? 10 : 15,
    paddingBottom: 80,
  },
  bookingCard: {
    backgroundColor: "#222",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  bookingDate: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
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
  bookingDetails: {
    padding: 15,
    flexDirection: "row",
  },
  detailRow: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  detailText: {
    color: "#fff",
    fontSize: 14,
  },
  bookingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#333",
    padding: 15,
  },
  cancelButton: {
    backgroundColor: "#F44336",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewButtonText: {
    color: "#4A00E0",
    fontWeight: "bold",
    marginRight: 5,
  },
  carIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0a0a3a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  detailsContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 2,
  },
})
