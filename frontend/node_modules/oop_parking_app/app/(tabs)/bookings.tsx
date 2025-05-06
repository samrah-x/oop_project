// app/(tabs)/bookings.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyBookings from '../../components/booking/MyBookings';

/**
 * BookingsScreen - Tab screen that renders the MyBookings component
 * 
 * This is a simple wrapper component that renders the MyBookings component
 * in the tab navigation structure.
 */
export default function BookingsScreen() {
  return (
    <View style={styles.container}>
      <MyBookings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});