import {
    mockUser,
    mockVehicles,
    mockParkingAreas,
    mockParkingSlots,
    mockBookings,
    mockPaymentCards,
    mockPayments,
  } from "../../utils/mock-data"
  import type {
    User,
    Vehicle,
    ParkingArea,
    ParkingSlot,
    Booking,
    PaymentCard,
    Payment,
    BookingRequest,
    PaymentRequest,
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    AuthTokens,
  } from "../types"
  import AsyncStorage from "@react-native-async-storage/async-storage"
  
  // Helper to simulate API delay
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  
  // Mock API class
  class MockApi {
    // Auth
    async login(credentials: LoginRequest): Promise<AuthResponse> {
      await delay(1000) // Simulate network delay
  
      // Check credentials (in a real app, this would be done on the server)
      if (credentials.email === "john.doe@example.com" && credentials.password === "password") {
        const tokens: AuthTokens = {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          expiresIn: 3600,
        }
  
        // Save tokens to AsyncStorage
        await AsyncStorage.setItem("access_token", tokens.accessToken)
        await AsyncStorage.setItem("refresh_token", tokens.refreshToken)
  
        return {
          user: mockUser,
          tokens,
        }
      } else {
        throw new Error("Invalid email or password")
      }
    }
  
    async register(userData: RegisterRequest): Promise<AuthResponse> {
      await delay(1000) // Simulate network delay
  
      // In a real app, we would validate the data and check for existing users
      const tokens: AuthTokens = {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        expiresIn: 3600,
      }
  
      // Save tokens to AsyncStorage
      await AsyncStorage.setItem("access_token", tokens.accessToken)
      await AsyncStorage.setItem("refresh_token", tokens.refreshToken)
  
      // Create a new user (in a real app, this would be saved to a database)
      const newUser: User = {
        id: "user-new",
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      }
  
      return {
        user: newUser,
        tokens,
      }
    }
  
    async getCurrentUser(): Promise<User> {
      await delay(500) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      return mockUser
    }
  
    async updateProfile(userData: Partial<User>): Promise<User> {
      await delay(1000) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      // Update user data (in a real app, this would update a database)
      const updatedUser = { ...mockUser, ...userData }
  
      return updatedUser
    }
  
    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
      await delay(1000) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      // Validate current password (in a real app, this would be done on the server)
      if (currentPassword !== "password") {
        throw new Error("Current password is incorrect")
      }
  
      // Password changed successfully (in a real app, this would update a database)
      return
    }
  
    // Vehicles
    async getUserVehicles(): Promise<Vehicle[]> {
      await delay(800) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      return mockVehicles
    }
  
    async addVehicle(vehicleData: Omit<Vehicle, "id" | "userId">): Promise<Vehicle> {
      await delay(1000) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      // Create a new vehicle (in a real app, this would be saved to a database)
      const newVehicle: Vehicle = {
        id: `vehicle-${Date.now()}`,
        userId: mockUser.id,
        ...vehicleData,
      }
  
      return newVehicle
    }
  
    // Parking
    async getParkingAreas(): Promise<ParkingArea[]> {
      await delay(800) // Simulate network delay
      return mockParkingAreas
    }
  
    async getParkingAreaById(id: string): Promise<ParkingArea> {
      await delay(500) // Simulate network delay
  
      const area = mockParkingAreas.find((area) => area.id === id)
      if (!area) {
        throw new Error("Parking area not found")
      }
  
      return area
    }
  
    async getAvailableSlots(areaId: string): Promise<ParkingSlot[]> {
      await delay(800) // Simulate network delay
  
      const slots = mockParkingSlots[areaId]
      if (!slots) {
        throw new Error("Parking area not found")
      }
  
      return slots.filter((slot) => slot.isAvailable)
    }
  
    // Bookings
    async getUserBookings(): Promise<{
      current: Booking[]
      future: Booking[]
      previous: Booking[]
    }> {
      await delay(1000) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      const now = new Date()
  
      // Categorize bookings
      const current = mockBookings.filter(
        (booking) =>
          booking.status === "ACTIVE" ||
          (booking.status === "CONFIRMED" && new Date(booking.startTime) <= now && new Date(booking.endTime) >= now),
      )
  
      const future = mockBookings.filter((booking) => booking.status === "CONFIRMED" && new Date(booking.startTime) > now)
  
      const previous = mockBookings.filter(
        (booking) =>
          booking.status === "COMPLETED" ||
          booking.status === "CANCELLED" ||
          (booking.status === "CONFIRMED" && new Date(booking.endTime) < now),
      )
  
      return { current, future, previous }
    }
  
    async createBooking(bookingData: BookingRequest): Promise<Booking> {
      await delay(1500) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      // Get parking slot and area
      const areaId =
        bookingData.parkingSlotId.split("-")[1].substring(0, 2) === "a1"
          ? "area-1"
          : bookingData.parkingSlotId.split("-")[1].substring(0, 2) === "a2"
            ? "area-2"
            : "area-3"
  
      const slotIndex = Number.parseInt(bookingData.parkingSlotId.split("-")[2]) - 1
      const parkingSlot = mockParkingSlots[areaId][slotIndex]
      const parkingArea = mockParkingAreas.find((area) => area.id === areaId)
  
      if (!parkingSlot || !parkingArea) {
        throw new Error("Invalid parking slot")
      }
  
      // Calculate price
      const startTime = new Date(bookingData.startTime)
      const endTime = new Date(bookingData.endTime)
      const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
      const totalPrice = hours * parkingArea.pricePerHour
  
      // Create a new booking (in a real app, this would be saved to a database)
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        userId: mockUser.id,
        parkingSlotId: bookingData.parkingSlotId,
        parkingAreaId: areaId,
        vehicleId: bookingData.vehicleId || mockVehicles[0].id,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        status: "CONFIRMED",
        totalPrice,
        paymentStatus: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        parkingSlot,
        parkingArea,
        vehicle: bookingData.vehicleId ? mockVehicles.find((v) => v.id === bookingData.vehicleId) : mockVehicles[0],
      }
  
      return newBooking
    }
  
    // Payments
    async getSavedCards(): Promise<PaymentCard[]> {
      await delay(800) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      return mockPaymentCards
    }
  
    async processPayment(paymentData: PaymentRequest): Promise<Payment> {
      await delay(2000) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      // Create a new payment (in a real app, this would be saved to a database)
      const newPayment: Payment = {
        id: `payment-${Date.now()}`,
        bookingId: paymentData.bookingId,
        userId: mockUser.id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        method: paymentData.method,
        status: "PAID",
        transactionId: `txn_${Math.floor(Math.random() * 1000000)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
  
      return newPayment
    }
  
    async getPaymentHistory(): Promise<Payment[]> {
      await delay(1000) // Simulate network delay
  
      // Check if user is authenticated
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
        throw new Error("Not authenticated")
      }
  
      return mockPayments
    }
  }
  
  export default new MockApi()
  