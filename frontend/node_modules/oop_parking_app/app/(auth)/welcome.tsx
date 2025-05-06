"use client"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

const { width, height } = Dimensions.get("window")

export default function Welcome() {
  const handleLogin = () => {
    // Add a debug alert to verify the button is working
    Alert.alert("Navigation", "Navigating to login screen")
    // Use the full path to ensure correct navigation
    router.push("/(auth)/login")
  }

  const handleRegister = () => {
    // Add a debug alert to verify the button is working
    Alert.alert("Navigation", "Navigating to register screen")
    // Use the full path to ensure correct navigation
    router.push("/(auth)/register")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2554/2554966.png" }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>ParkEZ</Text>
          <Text style={styles.tagline}>Smart Parking Solutions</Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="car" size={24} color="#fff" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Easy Booking</Text>
              <Text style={styles.featureDescription}>Book parking spots in advance with just a few taps</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="location" size={24} color="#fff" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Find Nearby Spots</Text>
              <Text style={styles.featureDescription}>Discover available parking areas near your destination</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="qr-code" size={24} color="#fff" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>QR Code Access</Text>
              <Text style={styles.featureDescription}>Scan to enter and exit parking areas seamlessly</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.7} // Add this to provide visual feedback
          >
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.7} // Add this to provide visual feedback
          >
            <Text style={styles.loginButtonText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.08,
    marginBottom: height * 0.05,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4A00E0",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
  },
  featuresContainer: {
    marginBottom: height * 0.05,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A00E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: "#aaa",
    lineHeight: 20,
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  registerButton: {
    backgroundColor: "#4A00E0",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
})
