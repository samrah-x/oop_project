// app/parking-space.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ParkingSpace from '../components/booking/ParkingSpace';

export default function ParkingSpaceScreen() {
  return (
    <View style={styles.container}>
      <ParkingSpace />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});