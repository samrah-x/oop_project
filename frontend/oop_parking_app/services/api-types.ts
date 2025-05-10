// Define types for API responses
export interface User {
    id: number | string
    name?: string
    email: string
    phone?: string
    gender?: string
    location?: string
  }
  
  export interface AuthResponse {
    user: User
    token?: string
    success: boolean
    message?: string
  }
  
  export interface BookingDetails {
    id: number | string
    parkingArea: string
    slot: string
    time: string
    status?: string
    price?: string
    qrCode?: string
  }
  
  export interface BookingsResponse {
    current: BookingDetails[]
    future: BookingDetails[]
    previous: BookingDetails[]
  }
  
  export interface ParkingSlot {
    id: string
    available: boolean
  }
  
  export interface ParkingSlotsResponse {
    [key: string]: ParkingSlot[]
  }
  
  export interface PaymentResponse {
    success: boolean
    transactionId?: string
    amount?: string
    status?: string
  }
  