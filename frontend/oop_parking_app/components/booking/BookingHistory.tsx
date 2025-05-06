// components/booking/BookingHistory.tsx
import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList, 
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
* BookingHistory Component - Shows user's past and current bookings
* 
* This component displays a list of the user's booking history,
* fetched from the backend database with real-time updates.
* 
* Backend Integration:
* - Fetches booking history from backend API
* - Updates booking status in real-time via WebSocket
* - Supports cancellation of active bookings
*/
export default function BookingHistory() {
  // State for bookings data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [webSocketConnected, setWebSocketConnected] = useState<boolean>(false);
  
  // Ref for WebSocket connection
  const wsRef = useRef<WebSocket | null>(null);
  
  // API endpoint configuration
  const API_BASE_URL = "https://your-backend-api.com";
  const WS_URL = "wss://your-backend-api.com/ws";

  /**
   * Fetch booking history from backend
   */
  const fetchBookingHistory = async () => {
    try {
      setError(null);
      
      // In a real implementation, replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/api/bookings/history`);
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
        },
        {
          id: "3",
          date: "17 Feb 2025",
          location: "West Wing",
          parkingArea: "PARKING AREA C",
          slot: "SLOT C3",
          startTime: "9:00 AM",
          endTime: "11:00 AM",
          status: "completed"
        },
        {
          id: "4",
          date: "15 Feb 2025",
          location: "Main Building",
          parkingArea: "PARKING AREA A",
          slot: "SLOT A1",
          startTime: "1:00 PM",
          endTime: "3:00 PM",
          status: "completed"
        }
      ];
      
      setBookings(data);
    } catch (err) {
      console.error("Error fetching booking history:", err);
      setError("Failed to load your booking history. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
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
      
      // Simulate a booking update after 8 seconds
      setTimeout(() => {
        if (bookings.length > 0) {
          const randomBookingIndex = Math.floor(Math.random() * bookings.length);
          const randomBooking = bookings[randomBookingIndex];
          if (randomBooking.status === 'active') {
            updateBookingStatus(randomBooking.id, 'completed');
            Alert.alert(
              "Booking Completed",
              `Your booking for ${randomBooking.slot} has been marked as completed.`,
              [{ text: "OK" }]
            );
          }
        }
      }, 8000);
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
    setBookings(currentBookings => 
      currentBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  /**
   * Fetch bookings when component mounts and set up WebSocket
   */
  useEffect(() => {
    fetchBookingHistory();
    const cleanup = initWebSocket();
    
    // Clean up WebSocket on component unmount
    return cleanup;
  }, []);

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    fetchBookingHistory();
  };

  /**
   * Handle booking cancellation
   */
  const handleCancelBooking = async (bookingId: string) => {
    try {
      // In a real implementation, make an actual API call
      // await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
      //   method: 'DELETE'
      // });
      
      // Update local state to reflect cancellation
      updateBookingStatus(bookingId, 'cancelled');
      
      Alert.alert(
        "Booking Cancelled",
        "Your booking has been successfully cancelled.",
        [{ text: "OK" }]
      );
    } catch (err) {
      console.error("Error cancelling booking:", err);
      Alert.alert("Error", "Failed to cancel booking. Please try again.");
    }
  };

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
   * Render a booking item in the list
   */
  const renderBookingItem = ({ item }: { item: Booking }) => {
    return (
      <TouchableOpacity 
        style={styles.bookingCard}
        onPress={() => handleViewBooking(item.id)}
      >
        <View style={styles.carIconContainer}>
          <FontAwesome5 name="car" size={30} color="#000" />
        </View>
        
        <View style={styles.bookingDetails}>
          <Text style={styles.bookingDate}>Parked on</Text>
          <Text style={styles.bookingDateValue}>{item.date}</Text>
          <Text style={styles.bookingLocation}>{item.location}</Text>
          
          {item.status === 'cancelled' && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>CANCELLED</Text>
            </View>
          )}
          
          {item.status === 'completed' && (
            <View style={[styles.statusBadge, styles.completedBadge]}>
              <Text style={styles.statusText}>COMPLETED</Text>
            </View>
          )}
          
          {item.status === 'active' && (
            <View style={[styles.statusBadge, styles.activeBadge]}>
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          )}
        </View>
        
        {item.status === 'active' && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => handleCancelBooking(item.id)}
          >
            <Ionicons name="close-circle" size={24} color="#ff6b6b" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My bookings</Text>
        
        {webSocketConnected && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveIndicatorDot} />
            <Text style={styles.liveIndicatorText}>LIVE</Text>
          </View>
        )}
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
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchBookingHistory}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={80} color="#666" />
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptySubtitle}>Your booking history will appear here</Text>
          <TouchableOpacity 
            style={styles.bookNowButton}
            onPress={() => router.push('/available-slots')}
          >
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

const { width, height } = Dimensions.get('window');
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    marginLeft: 15,
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
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  carIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A00E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  bookingDetails: {
    flex: 1,
  },
  bookingDate: {
    fontSize: 14,
    color: "#aaa",
  },
  bookingDateValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  bookingLocation: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 5,
  },
  statusBadge: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  activeBadge: {
    backgroundColor: "#4A00E0",
  },
  completedBadge: {
    backgroundColor: "#4CAF50",
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 5,
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