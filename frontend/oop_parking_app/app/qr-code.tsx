// app/qr-code.tsx
"use client";

import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";

export default function QRCodeScreen() {
  const params = useLocalSearchParams<{ slotName?: string; bookingStatus?: string }>();
  const { slotName, bookingStatus } = params;

  if (!slotName || !bookingStatus) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: Missing booking details.</Text>
      </SafeAreaView>
    );
  }

  const qrCodeValue = JSON.stringify({
    slotName,
    bookingStatus,
    timestamp: new Date().toISOString(),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.successText}>Booking Successful!</Text>
      <Text style={styles.slotText}>Slot: {slotName}</Text>
      <View style={styles.qrCodeContainer}>
        <QRCode value={qrCodeValue} size={200} color="#000" backgroundColor="#fff" />
      </View>
      <Text style={styles.statusText}>Status: {bookingStatus}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  slotText: {
    fontSize: 18,
    marginBottom: 20,
  },
  qrCodeContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  statusText: {
    fontSize: 16,
    color: "green",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});
