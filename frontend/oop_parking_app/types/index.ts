// Core types for the application

// User types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

// Booking types
export interface Booking {
  id: string
  userId: string
  parkingArea: string
  slot: string
  date: string
  startTime: string
  endTime: string
  status: BookingStatus
  price: string
  bookingCode: string
  vehicleType: VehicleType
}

export type BookingStatus = "active" | "upcoming" | "completed" | "cancelled"
export type VehicleType = "car" | "suv" | "bike" | "truck"

export interface BookingResponse {
  success: boolean
  data?: Booking | Booking[]
  message?: string
}

export interface CreateBookingData {
  parkingArea: string
  slot: string
  date: string
  startTime: string
  endTime: string
  vehicleType: VehicleType
  price?: string
}

// Parking types
export interface ParkingSlot {
  id: string
  name: string
  isOccupied: boolean
  position: {
    row: string
    column: number
  }
}

export interface ParkingArea {
  id: string
  name: string
  location: string
  totalSlots: number
  availableSlots: number
  slots?: ParkingSlot[]
}

export interface ParkingResponse {
  success: boolean
  data?: ParkingArea | ParkingArea[] | { area: ParkingArea; slot: ParkingSlot }
  message?: string
}

export interface SlotUpdateEvent {
  areaId: string
  slotId: string
  isOccupied: boolean
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface ApiError {
  success: false
  message: string
}

// Add the missing BookingRequest type
export type BookingRequest = {
  userId: string;
  parkingAreaId: string;
  slotId: string;
  startTime: Date;
  endTime: Date;
};