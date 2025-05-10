// app/ParkingSpace.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

interface ParkingSlot {
  id: string;
  name: string;
  isOccupied: boolean;
  row: string;
  column: number;
}

export default function ParkingSpace() {
  const { areaId, areaName } = useLocalSearchParams<{ areaId: string; areaName: string }>();

  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      // Simulated response
      setTimeout(() => {
        const mockSlots: ParkingSlot[] = [
          { id: "P1-1", name: "P1-1", isOccupied: true, row: "P1", column: 1 },
          { id: "P1-2", name: "P1-2", isOccupied: false, row: "P1", column: 2 },
          { id: "P1-3", name: "P1-3", isOccupied: false, row: "P1", column: 3 },
          { id: "P2-1", name: "P2-1", isOccupied: false, row: "P2", column: 1 },
          { id: "P2-2", name: "P2-2", isOccupied: true, row: "P2", column: 2 },
          { id: "P2-3", name: "P2-3", isOccupied: false, row: "P2", column: 3 },
          { id: "P3-1", name: "P3-1", isOccupied: false, row: "P3", column: 1 },
          { id: "P3-2", name: "P3-2", isOccupied: false, row: "P3", column: 2 },
          { id: "P3-3", name: "P3-3", isOccupied: true, row: "P3", column: 3 },
          { id: "P4-1", name: "P4-1", isOccupied: false, row: "P4", column: 1 },
          { id: "P4-2", name: "P4-2", isOccupied: false, row: "P4", column: 2 },
          { id: "P4-3", name: "P4-3", isOccupied: false, row: "P4", column: 3 },
          { id: "P5-1", name: "P5-1", isOccupied: false, row: "P5", column: 1 },
          { id: "P5-2", name: "P5-2", isOccupied: false, row: "P5", column: 2 },
          { id: "P5-3", name: "P5-3", isOccupied: false, row: "P5", column: 3 },
        ];
        setSlots(mockSlots);
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load parking slots");
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (areaId) fetchSlots();
  }, [areaId]);

  const handleSlotSelect = (slot: ParkingSlot) => {
    if (!slot.isOccupied) setSelectedSlot(slot);
  };

  const handleContinue = () => {
    if (!selectedSlot) {
      Alert.alert("Error", "Please select a parking slot first");
      return;
    }
  
    router.push({
      pathname: "../qr-code",
      params: {
        slotName: selectedSlot.name,
        bookingStatus: "Confirmed", // or any appropriate status
      },
    });
  };
  

  const getSlotsByRow = () => {
    const rows: { [key: string]: ParkingSlot[] } = {};
    slots.forEach((slot) => {
      if (!rows[slot.row]) rows[slot.row] = [];
      rows[slot.row].push(slot);
    });

    Object.keys(rows).forEach((row) => {
      rows[row].sort((a, b) => a.column - b.column);
    });

    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parking Space</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A00E0" />
          <Text style={styles.loadingText}>Loading parking slots...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchSlots}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            fetchSlots();
          }} />}
        >
          <Text style={styles.areaName}>{areaName || "Parking Area"}</Text>

          <View style={styles.parkingGrid}>
            {Object.entries(getSlotsByRow()).map(([row, rowSlots]) => (
              <View key={row} style={styles.row}>
                <Text style={styles.rowLabel}>{row}</Text>
                {rowSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.parkingSlot,
                      selectedSlot?.id === slot.id && styles.selectedSlot,
                      slot.isOccupied && styles.occupiedSlot,
                    ]}
                    onPress={() => handleSlotSelect(slot)}
                    disabled={slot.isOccupied}
                  >
                    {slot.isOccupied ? (
                      <FontAwesome5 name="car" size={24} color="#fff" />
                    ) : (
                      <Text style={styles.slotLabel}>{slot.name.split("-")[1]}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          {selectedSlot && (
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedText}>
                Selected: <Text style={styles.slotHighlight}>{selectedSlot.name}</Text>
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.continueButton, !selectedSlot && styles.disabledButton]}
            onPress={handleContinue}
            disabled={!selectedSlot}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/")}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push("../available-slots")}>
          <Ionicons name="car-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push("../booking-history")}>
          <Ionicons name="time-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  areaName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  parkingGrid: {
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rowLabel: {
    width: 30,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  parkingSlot: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedSlot: {
    borderColor: "#4A00E0",
    borderWidth: 2,
    backgroundColor: "rgba(74, 0, 224, 0.2)",
  },
  occupiedSlot: {
    backgroundColor: "#333",
  },
  slotLabel: {
    color: "#fff",
    fontSize: 14,
  },
  selectedInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "rgba(74, 0, 224, 0.1)",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#4A00E0",
  },
  selectedText: {
    color: "#fff",
    fontSize: 16,
  },
  slotHighlight: {
    fontWeight: "bold",
    color: "#4A00E0",
  },
  continueButton: {
    backgroundColor: "#4A00E0",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 80,
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
