// components/booking/AvailableSlots.tsx
import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator,
  TextInput,
  Dimensions,
  Platform,
  Alert
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

// Define TypeScript interfaces for our data
interface ParkingSlot {
  id: string;
  name: string;
  isOccupied: boolean;
  position: {
    row: string;
    column: number;
  };
}

interface ParkingSpace {
  id: string;
  name: string;
  slots: ParkingSlot[];
}

/**
* AvailableSlots Component - Shows parking layout and allows slot selection
* 
* This component displays a visual representation of the parking lot,
* allowing users to select an available parking slot in real-time.
* 
* Backend Integration:
* - Fetches available parking spaces and slots from backend
* - Updates slot status in real-time via WebSocket
* - Sends selected slot to backend when user confirms
*/
export default function AvailableSlots() {
  // State for parking spaces and slots
  const [spaces, setSpaces] = useState<ParkingSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<ParkingSpace | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [selectedCarColor, setSelectedCarColor] = useState<string>("yellow");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [webSocketConnected, setWebSocketConnected] = useState<boolean>(false);
  
  // Ref for WebSocket connection
  const wsRef = useRef<WebSocket | null>(null);
  
  // API endpoint configuration
  const API_BASE_URL = "https://your-backend-api.com";
  const WS_URL = "wss://your-backend-api.com/ws";

  /**
   * Fetch available parking spaces from backend
   */
  const fetchParkingSpaces = async () => {
    try {
      setError(null);
      
      // In a real implementation, replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/api/parking/spaces`);
      // const data = await response.json();
      
      // Simulating API response for demonstration
      const data: ParkingSpace[] = [
        {
          id: "1",
          name: "Entry",
          slots: [
            { id: "A1", name: "A1", isOccupied: false, position: { row: "A", column: 1 } },
            { id: "A2", name: "A2", isOccupied: true, position: { row: "A", column: 2 } },
            { id: "A3", name: "A3", isOccupied: false, position: { row: "A", column: 3 } },
            { id: "B1", name: "B1", isOccupied: false, position: { row: "B", column: 1 } },
            { id: "B2", name: "B2", isOccupied: false, position: { row: "B", column: 2 } },
            { id: "B3", name: "B3", isOccupied: true, position: { row: "B", column: 3 } },
            { id: "C1", name: "C1", isOccupied: false, position: { row: "C", column: 1 } },
            { id: "C2", name: "C2", isOccupied: false, position: { row: "C", column: 2 } },
            { id: "C3", name: "C3", isOccupied: true, position: { row: "C", column: 3 } },
          ]
        },
        {
          id: "2",
          name: "Main Building",
          slots: [
            { id: "D1", name: "D1", isOccupied: false, position: { row: "D", column: 1 } },
            { id: "D2", name: "D2", isOccupied: false, position: { row: "D", column: 2 } },
            { id: "D3", name: "D3", isOccupied: false, position: { row: "D", column: 3 } },
            { id: "E1", name: "E1", isOccupied: true, position: { row: "E", column: 1 } },
            { id: "E2", name: "E2", isOccupied: false, position: { row: "E", column: 2 } },
            { id: "E3", name: "E3", isOccupied: false, position: { row: "E", column: 3 } },
          ]
        }
      ];
      
      setSpaces(data);
      setSelectedSpace(data[0]);
    } catch (err) {
      console.error("Error fetching parking spaces:", err);
      setError("Failed to load parking spaces. Please try again.");
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
    //   if (data.type === 'SLOT_UPDATE') {
    //     // Update slot status when we receive a real-time update
    //     updateSlotStatus(data.slotId, data.isOccupied);
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
      
      // Simulate a slot update after 5 seconds
      setTimeout(() => {
        if (spaces.length > 0 && spaces[0].slots.length > 0) {
          const randomSlotIndex = Math.floor(Math.random() * spaces[0].slots.length);
          const randomSlot = spaces[0].slots[randomSlotIndex];
          updateSlotStatus(randomSlot.id, !randomSlot.isOccupied);
        }
      }, 5000);
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
   * Update slot status when receiving real-time updates
   */
  const updateSlotStatus = (slotId: string, isOccupied: boolean) => {
    setSpaces(currentSpaces => 
      currentSpaces.map(space => ({
        ...space,
        slots: space.slots.map(slot => 
          slot.id === slotId ? { ...slot, isOccupied } : slot
        )
      }))
    );
    
    // If the updated slot is the selected slot and it's now occupied, deselect it
    if (selectedSlot?.id === slotId && isOccupied) {
      setSelectedSlot(null);
      Alert.alert(
        "Slot No Longer Available",
        "The slot you selected has just been taken by another user.",
        [{ text: "OK" }]
      );
    }
  };

  /**
   * Fetch parking spaces when component mounts and set up WebSocket
   */
  useEffect(() => {
    fetchParkingSpaces();
    const cleanup = initWebSocket();
    
    // Clean up WebSocket on component unmount
    return cleanup;
  }, []);

  /**
   * Handle space selection
   */
  const handleSpaceSelect = (space: ParkingSpace) => {
    setSelectedSpace(space);
    setSelectedSlot(null);
  };

  /**
   * Handle slot selection
   */
  const handleSlotSelect = (slot: ParkingSlot) => {
    if (slot.isOccupied) return;
    setSelectedSlot(slot);
  };

  /**
   * Handle booking confirmation
   */
  const handleConfirmBooking = async () => {
    if (!selectedSlot || !selectedSpace) {
      Alert.alert("Error", "Please select a parking slot first");
      return;
    }
    
    try {
      // In a real implementation, make an actual API call
      // const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     spaceId: selectedSpace.id,
      //     slotId: selectedSlot.id,
      //     carColor: selectedCarColor,
      //     startTime: new Date().toISOString()
      //   }),
      // });
      // const data = await response.json();
      
      // Simulating API call
      console.log("Booking confirmed for slot:", selectedSlot.id);
      
      // Show success message
      Alert.alert(
        "Booking Confirmed",
        `You have successfully booked ${selectedSlot.name} in ${selectedSpace.name}.`,
        [
          { 
            text: "View My Bookings", 
            onPress: () => router.push("/") 
          },
          {
            text: "OK",
            style: "cancel"
          }
        ]
      );
      
      // Update local state to reflect the booking
      updateSlotStatus(selectedSlot.id, true);
      setSelectedSlot(null);
    } catch (err) {
      console.error("Error confirming booking:", err);
      Alert.alert("Error", "Failed to confirm booking. Please try again.");``
    }
  };

  /**
   * Group slots by row for display
   */
  const getSlotsByRow = () => {
    if (!selectedSpace) return {};
    
    const rows: { [key: string]: ParkingSlot[] } = {};
    selectedSpace.slots.forEach(slot => {
      const row = slot.position.row;
      if (!rows[row]) rows[row] = [];
      rows[row].push(slot);
    });
    
    // Sort slots within each row by column
    Object.keys(rows).forEach(row => {
      rows[row].sort((a, b) => a.position.column - b.position.column);
    });
    
    return rows;
  };

  /**
   * Render a car in a parking slot
   */
  const renderCar = (color: string = "yellow") => {
    return (
      <View style={[styles.car, { backgroundColor: color }]} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Slots</Text>
        
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
          <Text style={styles.loadingText}>Loading parking spaces...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchParkingSpaces}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.spaceSelector}>
            <Text style={styles.sectionTitle}>Choose Space</Text>
            <View style={styles.spacesContainer}>
              {spaces.map(space => (
                <TouchableOpacity
                  key={space.id}
                  style={[
                    styles.spaceOption,
                    selectedSpace?.id === space.id && styles.selectedSpaceOption
                  ]}
                  onPress={() => handleSpaceSelect(space)}
                >
                  <Text style={[
                    styles.spaceOptionText,
                    selectedSpace?.id === space.id && styles.selectedSpaceOptionText
                  ]}>
                    {space.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.parkingLayout}>
            <Text style={styles.layoutTitle}>{selectedSpace?.name || "Select a space"}</Text>
            
            {Object.entries(getSlotsByRow()).map(([row, slots]) => (
              <View key={row} style={styles.parkingRow}>
                <Text style={styles.rowLabel}>{row}</Text>
                <View style={styles.slotsContainer}>
                  {slots.map(slot => (
                    <TouchableOpacity
                      key={slot.id}
                      style={[
                        styles.parkingSlot,
                        selectedSlot?.id === slot.id && styles.selectedSlot,
                        slot.isOccupied && styles.occupiedSlot
                      ]}
                      onPress={() => handleSlotSelect(slot)}
                      disabled={slot.isOccupied}
                    >
                      {slot.isOccupied ? (
                        renderCar()
                      ) : (
                        <Text style={styles.slotName}>{slot.name}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
          
          {selectedSlot && (
            <View style={styles.selectionInfo}>
              <View style={styles.selectionBadge}>
                <Text style={styles.selectionText}>selected</Text>
              </View>
              <Text style={styles.slotInfoText}>Slot {selectedSlot.name}</Text>
            </View>
          )}
          
          <View style={styles.carSelection}>
            <Text style={styles.sectionTitle}>Select Your Car</Text>
            <View style={styles.carOptions}>
              {["red", "yellow", "blue", "green"].map(color => (
                <TouchableOpacity 
                  key={color} 
                  style={[
                    styles.carOption,
                    selectedCarColor === color && styles.selectedCarOption
                  ]}
                  onPress={() => setSelectedCarColor(color)}
                >
                  <View style={[styles.car, { backgroundColor: color }]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedSlot && styles.disabledButton
            ]} 
            onPress={handleConfirmBooking}
            disabled={!selectedSlot}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          
          <View style={styles.bottomSpace} />
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
  content: {
    flex: 1,
    padding: isSmallDevice ? 10 : 20,
  },
  spaceSelector: {
    marginBottom: 20,
  },
  spacesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  spaceOption: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSpaceOption: {
    backgroundColor: "#4A00E0",
  },
  spaceOptionText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedSpaceOptionText: {
    fontWeight: "bold",
  },
  parkingLayout: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  layoutTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  parkingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  rowLabel: {
    width: 30,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  slotsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  parkingSlot: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  selectedSlot: {
    borderColor: "#FFD700",
    borderWidth: 2,
    backgroundColor: "rgba(255, 215, 0, 0.2)",
  },
  occupiedSlot: {
    backgroundColor: "#333",
  },
  slotName: {
    color: "#fff",
    fontSize: 14,
  },
  car: {
    width: 40,
    height: 25,
    borderRadius: 5,
  },
  selectionInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  selectionBadge: {
    backgroundColor: "#FFD700",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectionText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
  slotInfoText: {
    color: "#fff",
    fontSize: 16,
  },
  carSelection: {
    marginBottom: 20,
  },
  carOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  carOption: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCarOption: {
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  continueButton: {
    backgroundColor: "#4A00E0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSpace: {
    height: 80,
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