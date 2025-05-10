// app/ParkingAreaScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text } from "../../ui/Text";

// Define TypeScript interfaces for our data
interface ParkingArea {
  id: string;
  name: string;
  location: string;
  availableSlots: number;
  totalSlots: number;
  image?: string;
}

/**
 * ParkingAreaScreen Component - Shows list of available parking areas
 * 
 * This component displays all parking areas with their availability status
 * 
 * Backend Integration:
 * - Fetches all parking areas from backend
 * - Shows real-time availability of slots in each area
 */
export default function ParkingAreaScreen() {
  const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch parking areas from backend
   */
  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        // In a real implementation, replace with actual API call
        // const response = await fetch('https://your-api.com/parking/areas');
        // const data = await response.json();
        
        // Simulating API response for demonstration
        setTimeout(() => {
          const mockAreas: ParkingArea[] = [
            {
              id: "1",
              name: "Main Building",
              location: "Ground Floor",
              availableSlots: 15,
              totalSlots: 20,
              image: "https://example.com/parking1.jpg"
            },
            {
              id: "2",
              name: "East Wing",
              location: "Level 1",
              availableSlots: 8,
              totalSlots: 12,
              image: "https://example.com/parking2.jpg"
            },
            {
              id: "3",
              name: "West Wing",
              location: "Level 2",
              availableSlots: 3,
              totalSlots: 10,
              image: "https://example.com/parking3.jpg"
            }
          ];
          
          setParkingAreas(mockAreas);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching parking areas:", err);
        setError("Failed to load parking areas");
        setLoading(false);
      }
    };

    fetchParkingAreas();
  }, []);

  /**
   * Navigate to parking space screen for slot selection
   */
  const handleAreaSelect = (area: ParkingArea) => {
    if (area.availableSlots === 0) {
      Alert.alert("No Available Slots", "This parking area is currently full.");
      return;
    }
    
    router.push({
      pathname: "/parking-space",
      params: {
        areaId: area.id,
        areaName: area.name
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parking Areas</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A00E0" />
          <Text style={styles.loadingText}>Loading parking areas...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {parkingAreas.map(area => (
            <TouchableOpacity
              key={area.id}
              style={styles.areaCard}
              onPress={() => handleAreaSelect(area)}
            >
              <View style={styles.areaImageContainer}>
                {area.image ? (
                  <Image 
                    source={{ uri: area.image }} 
                    style={styles.areaImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Ionicons name="car" size={40} color="#333" />
                  </View>
                )}
              </View>
              
              <View style={styles.areaInfo}>
                <Text style={styles.areaName}>{area.name}</Text>
                <Text style={styles.areaLocation}>{area.location}</Text>
                
                <View style={styles.availabilityContainer}>
                  <View 
                    style={[
                      styles.availabilityIndicator,
                      area.availableSlots === 0 ? styles.fullIndicator : 
                      area.availableSlots < area.totalSlots / 3 ? styles.limitedIndicator : 
                      styles.availableIndicator
                    ]} 
                  />
                  <Text style={styles.availabilityText}>
                    {area.availableSlots} of {area.totalSlots} slots available
                  </Text>
                </View>
              </View>
              
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          ))}
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

const { width } = Dimensions.get('window');

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
  scroll: { 
    padding: 16,
    paddingBottom: 80,
  },
  areaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    overflow: "hidden",
  },
  areaImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
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
  areaInfo: {
    flex: 1,
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