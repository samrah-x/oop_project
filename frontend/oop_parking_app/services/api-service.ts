// services/api-service.ts
import type { Booking, BookingRequest, ParkingArea, ParkingSlot } from "../types";

// Base API configuration
const API_BASE_URL = "https://your-api-domain.com/api"; // Change to your actual API endpoint

class ApiService {
  // Helper method for making authenticated API requests
  private async request<T>(
    endpoint: string,
    method: string = "GET",
    body?: any
  ): Promise<T> {
    const token = localStorage.getItem("authToken");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const config: RequestInit = {
      method,
      headers,
      credentials: "include", // Include cookies if needed
    };
    
    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API request failed: ${response.status}`
      );
    }
    
    return response.json();
  }

  // Get all user bookings
  async getUserBookings(): Promise<{
    current: Booking[];
    future: Booking[];
    previous: Booking[];
  }> {
    return this.request<{
      current: Booking[];
      future: Booking[];
      previous: Booking[];
    }>("/bookings");
  }

  // Create a new booking
  async createBooking(bookingData: BookingRequest): Promise<Booking> {
    return this.request<Booking>("/bookings", "POST", bookingData);
  }

  // Cancel a booking
  async cancelBooking(bookingId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/bookings/${bookingId}/cancel`,
      "POST"
    );
  }

  // Update a booking
  async updateBooking(
    bookingId: string,
    updateData: Partial<BookingRequest>
  ): Promise<Booking> {
    return this.request<Booking>(
      `/bookings/${bookingId}`,
      "PUT",
      updateData
    );
  }

  // Get all parking areas
  async getParkingAreas(): Promise<ParkingArea[]> {
    return this.request<ParkingArea[]>("/parking-areas");
  }

  // Get available slots for a specific parking area
  async getAvailableSlots(
    parkingAreaId: string,
    startTime: Date,
    endTime: Date
  ): Promise<ParkingSlot[]> {
    const queryParams = new URLSearchParams({
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });
    
    return this.request<ParkingSlot[]>(
      `/parking-areas/${parkingAreaId}/available-slots?${queryParams}`
    );
  }

  // Process payment for a booking
  async processPayment(
    bookingId: string,
    paymentDetails: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
      amount: number;
    }
  ): Promise<{
    success: boolean;
    transactionId?: string;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      transactionId?: string;
      message: string;
    }>(`/bookings/${bookingId}/payment`, "POST", paymentDetails);
  }

  // Get user profile
  async getUserProfile(): Promise<{
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicles: { licensePlate: string; type: string; color: string }[];
  }> {
    return this.request<{
      id: string;
      name: string;
      email: string;
      phone: string;
      vehicles: { licensePlate: string; type: string; color: string }[];
    }>("/user/profile");
  }

  // Get a specific booking by ID
  async getBookingById(bookingId: string): Promise<Booking> {
    return this.request<Booking>(`/bookings/${bookingId}`);
  }
}

const apiService = new ApiService();
export default apiService;