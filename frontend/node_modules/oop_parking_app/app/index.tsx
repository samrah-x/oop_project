"use client"
import { StyleSheet, Dimensions } from "react-native"
import { Redirect } from "expo-router"

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

export default function Index() {
  // Redirect to the welcome page on app start
  return <Redirect href="/(auth)/welcome" />
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
