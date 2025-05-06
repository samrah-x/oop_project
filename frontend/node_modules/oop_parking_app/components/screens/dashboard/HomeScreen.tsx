"use client";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text } from "../../ui/Text";
import { useParking } from "../../../hooks/useParking";

import type { ParkingArea } from "../../../hooks/useParking";

const { width } = Dimensions.get("window");

export const HomeScreen = () => {
  const { parkingAreas, fetchParkingAreas } = useParking();
  const [nearbyAreas, setNearbyAreas] = useState<ParkingArea[]>([]);

  useEffect(() => {
    console.log("Parking Areas:", parkingAreas); // Debugging log
    if (parkingAreas.length > 0) {
      const nearby = parkingAreas.slice(0, 5);
      console.log("Nearby Areas:", nearby); // Debugging log
      setNearbyAreas(nearby);
    }
  }, [parkingAreas]);

  const handleViewParkingArea = (areaId: string, areaName: string) => {
    console.log("Navigating to Available Slots with:", { areaId, areaName }); // Debugging log
    router.push({
      pathname: "/available-slots",
      params: {
        areaId,
        areaName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Parking Areas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {nearbyAreas.map((area) => (
              <TouchableOpacity
                key={area.id}
                style={styles.areaCard}
                onPress={() => handleViewParkingArea(area.id, area.name)}
              >
                <ImageBackground
                  source={{ uri: area.imageUrl || "https://via.placeholder.com/150" }} // Fallback image
                  style={styles.areaImage}
                  imageStyle={{ borderRadius: 8 }}
                >
                  <LinearGradient
                    colors={["rgba(0,0,0,0.6)", "transparent"]}
                    style={styles.gradientOverlay}
                  />
                  <Text style={styles.areaName}>{area.name || "Unknown Area"}</Text>
                  <Text style={styles.areaLocation}>{area.location || "Unknown Location"}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  areaCard: {
    marginRight: 10,
    width: 150,
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  areaImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    padding: 10,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
  },
  areaName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  areaLocation: {
    fontSize: 14,
    color: "#ccc",
  },
});
