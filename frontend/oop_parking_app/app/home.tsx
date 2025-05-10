"use client"

import { useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import BottomNavbar from "../components/BottomNavbar"
import { useAuth } from "../contexts/AuthContext"

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

interface ParkingArea {
  id: string
  name: string
  location: string
  availableSlots: number
  totalSlots: number
  image?: string
}

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth()

  // Check authentication status and redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/welcome")
    }
  }, [isAuthenticated, isLoading])

  // If still checking authentication or not authenticated, show loading
  if (isLoading || !isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A00E0" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  // Mock data for UI display
  const activeBookings = [
    {
      id: "1",
      date: "Today",
      location: "Main Building",
      parkingArea: "PARKING AREA A",
      slot: "SLOT A2",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      status: "active",
    },
  ]

  const nearbyAreas = [
    {
      id: "1",
      name: "Main Building",
      location: "Ground Floor",
      availableSlots: 15,
      totalSlots: 20,
      image: "https://example.com/parking1.jpg",
    },
    {
      id: "2",
      name: "East Wing",
      location: "Level 1",
      availableSlots: 8,
      totalSlots: 12,
      image: "https://example.com/parking2.jpg",
    },
    {
      id: "3",
      name: "West Wing",
      location: "Level 2",
      availableSlots: 3,
      totalSlots: 10,
      image: "https://example.com/parking3.jpg",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{user?.name || "User"}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => router.push("/profile")}>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/booking-screen")}>
            <View style={styles.actionIcon}>
              <Ionicons name="car" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>Book Parking</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/booking-history")}>
            <View style={styles.actionIcon}>
              <Ionicons name="time" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>My Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/qr-code")}>
            <View style={styles.actionIcon}>
              <Ionicons name="qr-code" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>QR Code</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Bookings</Text>
            <TouchableOpacity onPress={() => router.push("/booking-history")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {activeBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="car-outline" size={40} color="#666" />
              <Text style={styles.emptyStateText}>No active bookings</Text>
              <TouchableOpacity style={styles.bookNowButton} onPress={() => router.push("/booking-screen")}>
                <Text style={styles.bookNowButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          ) : (
            activeBookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                style={styles.bookingCard}
                onPress={() =>
                  router.push({
                    pathname: "/booking-details",
                    params: { bookingId: booking.id },
                  })
                }
              >
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingDate}>{booking.date}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>ACTIVE</Text>
                  </View>
                </View>

                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={20} color="#aaa" />
                    <Text style={styles.detailText}>{booking.location}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="car-outline" size={20} color="#aaa" />
                    <Text style={styles.detailText}>
                      {booking.parkingArea} - {booking.slot}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={20} color="#aaa" />
                    <Text style={styles.detailText}>
                      {booking.startTime} - {booking.endTime}
                    </Text>
                  </View>
                </View>

                <View style={styles.bookingFooter}>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View Details</Text>
                    <Ionicons name="chevron-forward" size={16} color="#4A00E0" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Parking Areas</Text>
            <TouchableOpacity onPress={() => router.push("../parking-areas")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nearbyAreasContainer}
          >
            {nearbyAreas.map((area) => (
              <TouchableOpacity
                key={area.id}
                style={styles.areaCard}
                onPress={() =>
                  router.push({
                    pathname: "/parking-space",
                    params: {
                      areaId: area.id,
                      areaName: area.name,
                    },
                  })
                }
              >
                <View style={styles.areaImageContainer}>
                  <View style={styles.placeholderImage}>
                    <Ionicons name="car" size={30} color="#333" />
                  </View>
                </View>

                <Text style={styles.areaName}>{area.name}</Text>
                <Text style={styles.areaLocation}>{area.location}</Text>

                <View style={styles.availabilityContainer}>
                  <View
                    style={[
                      styles.availabilityIndicator,
                      area.availableSlots === 0
                        ? styles.fullIndicator
                        : area.availableSlots < area.totalSlots / 3
                          ? styles.limitedIndicator
                          : styles.availableIndicator,
                    ]}
                  />
                  <Text style={styles.availabilityText}>
                    {area.availableSlots} of {area.totalSlots} slots available
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNavbar currentRoute="home" />
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#111",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greeting: {
    fontSize: 14,
    color: "#ccc",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
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
    padding: isSmallDevice ? 10 : 15,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
    width: (width - 40) / 3,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A00E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  seeAllText: {
    fontSize: 14,
    color: "#4A00E0",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 30,
  },
  emptyStateText: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  bookNowButton: {
    backgroundColor: "#4A00E0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bookNowButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
    backgroundColor: "#4A00E0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  bookingDetails: {
    padding: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },
  bookingFooter: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    padding: 15,
    alignItems: "center",
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
  nearbyAreasContainer: {
    paddingVertical: 10,
  },
  areaCard: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 12,
    marginRight: 15,
    width: 200,
  },
  areaImageContainer: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  areaImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  areaName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  areaLocation: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 8,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  availableIndicator: {
    backgroundColor: "#4CAF50",
  },
  limitedIndicator: {
    backgroundColor: "#FFC107",
  },
  fullIndicator: {
    backgroundColor: "#F44336",
  },
  availabilityText: {
    fontSize: 12,
    color: "#aaa",
  },
  bottomSpace: {
    height: 80,
  },
})
