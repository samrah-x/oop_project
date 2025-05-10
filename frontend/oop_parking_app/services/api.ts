// This file will contain all API calls to your backend

// Base URL for your API
const API_BASE_URL = "http://your-backend-url.com/api"

// User related API calls
export const userApi = {
  // Get user profile
  getUserProfile: async () => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/users/profile`).then(res => res.json());

    // For now, return mock data
    return {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8901",
      gender: "Male",
      location: "New York, NY",
    }
  },

  // Update user profile
  updateUserProfile: async (userData: any) => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/users/profile`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // }).then(res => res.json());

    // For now, return the data that was sent
    return userData
  },

  // Change password
  changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/users/change-password`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(passwordData)
    // }).then(res => res.json());

    // For now, return success
    return { success: true, message: "Password changed successfully" }
  },

  // Login
  login: async (credentials: { email: string; password: string }) => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials)
    // }).then(res => res.json());

    // For now, return mock token
    return {
      token: "mock-jwt-token",
      user: {
        id: 1,
        name: "John Doe",
        email: credentials.email,
      },
    }
  },

  // Register
  register: async (userData: any) => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/auth/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // }).then(res => res.json());

    // For now, return success
    return {
      success: true,
      message: "Registration successful",
      user: {
        id: 1,
        ...userData,
      },
    }
  },
}

// Booking related API calls
export const bookingApi = {
  // Get all bookings
  getBookings: async () => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/bookings`).then(res => res.json());

    // For now, return mock data
    return {
      current: [
        {
          id: 1,
          parkingArea: "PARKING AREA A",
          slot: "SLOT A2",
          time: "May 1, 2023 • 10:00 AM - 12:00 PM",
        },
      ],
      future: [
        {
          id: 2,
          parkingArea: "PARKING AREA B",
          slot: "SLOT B5",
          time: "May 5, 2023 • 2:00 PM - 4:00 PM",
        },
      ],
      previous: [
        {
          id: 3,
          parkingArea: "PARKING AREA C",
          slot: "SLOT C3",
          time: "April 28, 2023 • 9:00 AM - 11:00 AM",
        },
        {
          id: 4,
          parkingArea: "PARKING AREA A",
          slot: "SLOT A1",
          time: "April 25, 2023 • 1:00 PM - 3:00 PM",
        },
      ],
    }
  },

  // Create a new booking
  createBooking: async (bookingData: any) => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/bookings`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(bookingData)
    // }).then(res => res.json());

    // For now, return success with mock data
    return {
      success: true,
      booking: {
        id: Math.floor(Math.random() * 1000),
        ...bookingData,
        status: "confirmed",
      },
    }
  },

  // Get booking details
  getBookingDetails: async (bookingId: number) => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/bookings/${bookingId}`).then(res => res.json());

    // For now, return mock data
    return {
      id: bookingId,
      parkingArea: "PARKING AREA A",
      slot: "SLOT A2",
      time: "May 1, 2023 • 10:00 AM - 12:00 PM",
      status: "active",
      price: "$10.00",
      qrCode: "https://parkez.com/booking/B2",
    }
  },
}

// Parking related API calls
export const parkingApi = {
  // Get available parking slots
  getAvailableSlots: async () => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/parking/available`).then(res => res.json());

    // For now, return mock data
    return {
      P1: [
        { id: "P1-1", available: false },
        { id: "P1-2", available: true },
        { id: "P1-3", available: true },
      ],
      P2: [
        { id: "P2-1", available: true },
        { id: "P2-2", available: false },
        { id: "P2-3", available: true },
      ],
      P3: [
        { id: "P3-1", available: true },
        { id: "P3-2", available: true },
        { id: "P3-3", available: false },
      ],
      P4: [
        { id: "P4-1", available: true },
        { id: "P4-2", available: true },
        { id: "P4-3", available: true },
      ],
      P5: [
        { id: "P5-1", available: true },
        { id: "P5-2", available: true },
        { id: "P5-3", available: true },
      ],
    }
  },

  // Reserve a parking slot
  reserveSlot: async (slotId: string) => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/parking/reserve`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ slotId })
    // }).then(res => res.json());

    // For now, return success
    return {
      success: true,
      message: `Slot ${slotId} reserved successfully`,
      reservationId: Math.floor(Math.random() * 1000),
    }
  },
}

// Payment related API calls
export const paymentApi = {
  // Process payment
  processPayment: async (paymentData: any) => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/payments/process`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(paymentData)
    // }).then(res => res.json());

    // For now, return success
    return {
      success: true,
      transactionId: `TXN-${Math.floor(Math.random() * 10000)}`,
      amount: paymentData.amount || "10.00",
      status: "completed",
    }
  },

  // Get payment history
  getPaymentHistory: async () => {
    // This will be replaced with actual API call
    // return await fetch(`${API_BASE_URL}/payments/history`).then(res => res.json());

    // For now, return mock data
    return [
      {
        id: 1,
        date: "May 1, 2023",
        amount: "$10.00",
        status: "completed",
        bookingId: 1,
      },
      {
        id: 2,
        date: "April 28, 2023",
        amount: "$8.00",
        status: "completed",
        bookingId: 3,
      },
      {
        id: 3,
        date: "April 25, 2023",
        amount: "$12.00",
        status: "completed",
        bookingId: 4,
      },
    ]
  },
}
