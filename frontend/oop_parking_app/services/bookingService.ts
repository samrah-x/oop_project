// services/bookingService.ts
// Booking service for managing parking bookings

import { EventEmitter } from "events"
import type { Booking, BookingResponse, CreateBookingData } from "../types"

// Create event emitter for real-time updates
export const bookingsEmitter = new EventEmitter()

// Mock bookings data
const bookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    parkingArea: "PARKING AREA A",
    slot: "SLOT A2",
    date: "2023-05-17",
    startTime: "10:00",
    endTime: "12:00",
    status: "active",
    price: "$5.00",
    bookingCode: "PARK12345",
    vehicleType: "car",
  },
  {
    id: "2",
    userId: "1",
    parkingArea: "PARKING AREA B",
    slot: "SLOT B5",
    date: "2023-05-20",
    startTime: "14:00",
    endTime: "16:00",
    status: "upcoming",
    price: "$5.00",
    bookingCode: "PARK67890",
    vehicleType: "suv",
  },
  {
    id: "3",
    userId: "1",
    parkingArea: "PARKING AREA C",
    slot: "SLOT C3",
    date: "2023-05-10",
    startTime: "09:00",
    endTime: "11:00",
    status: "completed",
    price: "$5.00",
    bookingCode: "PARK24680",
    vehicleType: "car",
  },
]

/**
 * Get all bookings for a user
 * @param userId User ID
 * @returns Booking response with user's bookings
 */
export const getBookings = async (userId: string): Promise<BookingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    data: bookings.filter((booking) => booking.userId === userId),
  }
}

/**
 * Get a specific booking by ID
 * @param bookingId Booking ID
 * @returns Booking response with booking details
 */
export const getBookingById = async (bookingId: string): Promise<BookingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const booking = bookings.find((b) => b.id === bookingId)

  if (!booking) {
    return { success: false, message: "Booking not found" }
  }

  return { success: true, data: booking }
}

/**
 * Create a new booking
 * @param bookingData Booking data
 * @returns Booking response with new booking details
 */
export const createBooking = async (bookingData: CreateBookingData & { userId: string }): Promise<BookingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newBooking: Booking = {
    id: String(bookings.length + 1),
    ...bookingData,
    status: "active",
    price: bookingData.price || "$5.00",
    bookingCode: `PARK${Math.floor(10000 + Math.random() * 90000)}`,
  }

  bookings.push(newBooking)

  // Emit real-time update
  bookingsEmitter.emit("bookingCreated", newBooking)

  return { success: true, data: newBooking }
}

/**
 * Cancel a booking
 * @param bookingId Booking ID
 * @returns Booking response with updated booking details
 */
export const cancelBooking = async (bookingId: string): Promise<BookingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const bookingIndex = bookings.findIndex((b) => b.id === bookingId)

  if (bookingIndex === -1) {
    return { success: false, message: "Booking not found" }
  }

  // Update booking status
  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    status: "cancelled",
  }

  // Emit real-time update
  bookingsEmitter.emit("bookingUpdated", bookings[bookingIndex])

  return { success: true, data: bookings[bookingIndex] }
}

/**
 * Extend a booking's end time
 * @param bookingId Booking ID
 * @param newEndTime New end time
 * @returns Booking response with updated booking details
 */
export const extendBooking = async (bookingId: string, newEndTime: string): Promise<BookingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const bookingIndex = bookings.findIndex((b) => b.id === bookingId)

  if (bookingIndex === -1) {
    return { success: false, message: "Booking not found" }
  }

  // Update booking end time
  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    endTime: newEndTime,
  }

  // Emit real-time update
  bookingsEmitter.emit("bookingUpdated", bookings[bookingIndex])

  return { success: true, data: bookings[bookingIndex] }
}

/**
 * Function to simulate real-time updates (for demo purposes)
 */
export const simulateRealTimeUpdates = (): void => {
  setInterval(() => {
    // Randomly update a booking status
    const randomIndex = Math.floor(Math.random() * bookings.length)
    const randomStatus = ["active", "completed", "cancelled", "upcoming"][
      Math.floor(Math.random() * 4)
    ] as Booking["status"]

    bookings[randomIndex] = {
      ...bookings[randomIndex],
      status: randomStatus,
    }

    bookingsEmitter.emit("bookingUpdated", bookings[randomIndex])
  }, 30000) // Every 30 seconds
}

// Start simulation
simulateRealTimeUpdates()
