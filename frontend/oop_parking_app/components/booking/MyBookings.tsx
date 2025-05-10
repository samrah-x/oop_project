// components/booking/MyBookings.tsx
import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

// Define TypeScript interfaces for our data
interface Booking {
  id: string;
  date: string;
  location: string;
  parkingArea: string;
  slot: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
}

/**
* MyBookings Component - Main dashboard showing current bookings
* 
* This component displays the user's active bookings and provides
* navigation to booking history and available slots.
* 
* Backend Integration:
* - Fetches active bookings from backend API
* - Updates booking status in real-time via WebSocket
* - Supports navigation to detailed booking view
*/
export default function MyBookings() {
  // State for bookings data
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [webSocketConnected, setWebSocketConnected] = useState<boolean>(false);
  
  // Ref for WebSocket connection
  const wsRef = useRef<WebSocket | null>(null);
  
  // API endpoint configuration
  const API_BASE_URL = "https://your-backend-api.com";
  const WS_URL = "wss://your-backend-api.com/ws";

  /**
   * Fetch active bookings from backend
   */
  const fetchActiveBookings = async () => {
    try {
      setError(null);
      
      // In a real implementation, replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/api/bookings/active`);
      // const data = await response.json();
      
      // Simulating API response for demonstration
      const data: Booking[] = [
        {
          id: "1",
          date: "17 Feb 2025",
          location: "Main Building",
          parkingArea: "PARKING AREA A",
          slot: "SLOT A2",
          startTime: "10:00 AM",
          endTime: "12:00 PM",
          status: "active"
        },
        {
          id: "2",
          date: "17 Feb 2025",
          location: "East Wing",
          parkingArea: "PARKING AREA B",
          slot: "SLOT B5",
          startTime: "2:00 PM",
          endTime: "4:00 PM",
          status: "active"
        }
      ];
      
      setActiveBookings(data);
    } catch (err) {
      console.error("Error fetching active bookings:", err);
      setError("Failed to load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initialize WebSocket connection for real-time updates
   */
  const initWebSocket = () => {
    // In a real implementation, create an actual WebSocket connection
    // wsRef.current = new WebSocket(WS_URL);
    
    // wsRef.current.onopen = () => {
    //   console.log('WebSocket connected');
    //   setWebSocketConnected(true);
    // };
    
    // wsRef.current.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data.type === 'BOOKING_UPDATE') {
    //     // Update booking status when we receive a real-time update
    //     updateBookingStatus(data.bookingId, data.status);
    //   }
    // };
    
    // wsRef.current.onclose = () => {
    //   console.log('WebSocket disconnected');
    //   setWebSocketConnected(false);
    //   // Attempt to reconnect after a delay
    //   setTimeout(initWebSocket, 5000);
    // };
    
    // wsRef.current.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };
    
    // Simulating WebSocket connection for demonstration
    setTimeout(() => {
      console.log('WebSocket connected (simulated)');
      setWebSocketConnected(true);
    }, 1000);
    
    // Return cleanup function
    return () => {
      // if (wsRef.current) {
      //   wsRef.current.close();
      // }
      console.log('WebSocket disconnected (simulated)');
    };
  };

  /**
   * Update booking status when receiving real-time updates
   */
  const updateBookingStatus = (bookingId: string, status: 'active' | 'completed' | 'cancelled') => {
    if (status !== 'active') {
      // Remove booking from active bookings if status is not active
      setActiveBookings(currentBookings => 
        currentBookings.filter(booking => booking.id !== bookingId)
      );
    } else {
      // Update booking status
      setActiveBookings(currentBookings => 
        currentBookings.map(booking => 
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );
    }
  };

  /**
   * Fetch bookings when component mounts and set up WebSocket
   */
  useEffect(() => {
    fetchActiveBookings();
    const cleanup = initWebSocket();
    
    // Clean up WebSocket on component unmount
    return cleanup;
  }, []);

  /**
   * Navigate to booking details
   */
  const handleViewBooking = (bookingId: string) => {
    router.push({
      pathname: "/booking-details",
      params: { bookingId }
    });
  };

  /**
   * Navigate to available slots
   */
  const handleFindParking = () => {
    router.push("/available-slots");
  };

  /**
   * Navigate to booking history
   */
  const handleViewHistory = () => {
    router.push("/booking-history");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        
        {webSocketConnected && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveIndicatorDot} />
            <Text style={styles.liveIndicatorText}>LIVE</Text>
          </View>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A00E0" />
          <Text style={styles.loadingText}>Loading your bookings...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchActiveBookings}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Bookings</Text>
            
            {activeBookings.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="car-outline" size={60} color="#666" />
                <Text style={styles.emptyStateText}>No active bookings</Text>
                <TouchableOpacity 
                  style={styles.findParkingButton}
                  onPress={handleFindParking}
                >
                  <Text style={styles.findParkingButtonText}>Find Parking</Text>
                </TouchableOpacity>
              </View>
            ) : (
              activeBookings.map(booking => (
                <TouchableOpacity
                  key={booking.id}
                  style={styles.bookingCard}
                  onPress={() => handleViewBooking(booking.id)}
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
                      <Text style={styles.detailText}>{booking.parkingArea} - {booking.slot}</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Ionicons name="time-outline" size={20} color="#aaa" />
                      <Text style={styles.detailText}>{booking.startTime} - {booking.endTime}</Text>
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
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleFindParking}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="search" size={24} color="#fff" />
              </View>
              <Text style={styles.actionButtonText}>Find Parking</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleViewHistory}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name="time" size={24} color="#fff" />
              </View>
              <Text style={styles.actionButtonText}>Booking History</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/")}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/available-slots")}>
          <Ionicons name="car-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/booking-history")}>
          <Ionicons name="time-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#111",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff0000",
    marginRight: 5,
  },
  liveIndicatorText: {
    color: "#ff0000",
    fontSize: 12,
    fontWeight: "bold",
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
    padding: isSmallDevice ? 10 : 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
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
  findParkingButton: {
    backgroundColor: "#4A00E0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  findParkingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewButtonText: {
    color: "#4A00E0",
    fontWeight: "bold",
    marginRight: 5,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A00E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: "#111",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: "center",
    padding: 10,
  },
});