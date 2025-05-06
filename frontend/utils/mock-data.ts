import type { Booking, ParkingArea, ParkingSlot, Payment, PaymentCard, User, Vehicle } from "types"

// Mock user data
export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8901",
  gender: "Male",
  location: "New York, NY",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
}

// Mock vehicles
export const mockVehicles: Vehicle[] = [
  {
    id: "vehicle-1",
    userId: "user-1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Silver",
    licensePlate: "ABC123",
    isDefault: true,
  },
  {
    id: "vehicle-2",
    userId: "user-1",
    make: "Honda",
    model: "Civic",
    year: 2019,
    color: "Blue",
    licensePlate: "XYZ789",
    isDefault: false,
  },
]

// Mock parking areas
export const mockParkingAreas: ParkingArea[] = [
  {
    id: "area-1",
    name: "Downtown Parking",
    location: "123 Main St, New York, NY",
    totalSlots: 50,
    availableSlots: 15,
    pricePerHour: 5.0,
    openingTime: "06:00",
    closingTime: "22:00",
    levels: 2,
    hasHandicappedSlots: true,
    hasChargingStations: true,
  },
  {
    id: "area-2",
    name: "Central Park Garage",
    location: "456 Park Ave, New York, NY",
    totalSlots: 100,
    availableSlots: 30,
    pricePerHour: 7.5,
    openingTime: "00:00",
    closingTime: "23:59",
    levels: 3,
    hasHandicappedSlots: true,
    hasChargingStations: true,
  },
  {
    id: "area-3",
    name: "Riverside Parking",
    location: "789 River Rd, New York, NY",
    totalSlots: 75,
    availableSlots: 25,
    pricePerHour: 4.0,
    openingTime: "07:00",
    closingTime: "21:00",
    levels: 1,
    hasHandicappedSlots: true,
    hasChargingStations: false,
  },
]

// Mock parking slots
export const mockParkingSlots: Record<string, ParkingSlot[]> = {
  "area-1": Array.from({ length: 50 }, (_, i) => ({
    id: `slot-a1-${i + 1}`,
    name: `A${i + 1}`,
    area: "Downtown Parking",
    level: i < 25 ? "1" : "2",
    isAvailable: Math.random() > 0.3,
    isReserved: Math.random() < 0.1,
    isHandicapped: i % 10 === 0,
    isCharging: i % 15 === 0,
    price: 5.0,
    coordinates: {
      x: i % 5,
      y: Math.floor(i / 5),
    },
  })),
  "area-2": Array.from({ length: 100 }, (_, i) => ({
    id: `slot-a2-${i + 1}`,
    name: `B${i + 1}`,
    area: "Central Park Garage",
    level: i < 33 ? "1" : i < 66 ? "2" : "3",
    isAvailable: Math.random() > 0.3,
    isReserved: Math.random() < 0.1,
    isHandicapped: i % 10 === 0,
    isCharging: i % 15 === 0,
    price: 7.5,
    coordinates: {
      x: i % 10,
      y: Math.floor(i / 10),
    },
  })),
  "area-3": Array.from({ length: 75 }, (_, i) => ({
    id: `slot-a3-${i + 1}`,
    name: `C${i + 1}`,
    area: "Riverside Parking",
    level: "1",
    isAvailable: Math.random() > 0.3,
    isReserved: Math.random() < 0.1,
    isHandicapped: i % 10 === 0,
    isCharging: false,
    price: 4.0,
    coordinates: {
      x: i % 15,
      y: Math.floor(i / 15),
    },
  })),
}

// Mock bookings
const now = new Date()
const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)
const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)

export const mockBookings: Booking[] = [
  {
    id: "booking-1",
    userId: "user-1",
    parkingSlotId: "slot-a1-5",
    parkingAreaId: "area-1",
    vehicleId: "vehicle-1",
    startTime: now.toISOString(),
    endTime: oneHourLater.toISOString(),
    status: "ACTIVE",
    totalPrice: 5.0,
    paymentStatus: "PAID",
    createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
    parkingSlot: mockParkingSlots["area-1"][4],
    parkingArea: mockParkingAreas[0],
    vehicle: mockVehicles[0],
  },
  {
    id: "booking-2",
    userId: "user-1",
    parkingSlotId: "slot-a2-10",
    parkingAreaId: "area-2",
    vehicleId: "vehicle-1",
    startTime: twoDaysLater.toISOString(),
    endTime: new Date(twoDaysLater.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    status: "CONFIRMED",
    totalPrice: 15.0,
    paymentStatus: "PAID",
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    parkingSlot: mockParkingSlots["area-2"][9],
    parkingArea: mockParkingAreas[1],
    vehicle: mockVehicles[0],
  },
  {
    id: "booking-3",
    userId: "user-1",
    parkingSlotId: "slot-a3-15",
    parkingAreaId: "area-3",
    vehicleId: "vehicle-2",
    startTime: threeDaysLater.toISOString(),
    endTime: new Date(threeDaysLater.getTime() + 3 * 60 * 60 * 1000).toISOString(),
    status: "CONFIRMED",
    totalPrice: 12.0,
    paymentStatus: "PAID",
    createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
    parkingSlot: mockParkingSlots["area-3"][14],
    parkingArea: mockParkingAreas[2],
    vehicle: mockVehicles[1],
  },
  {
    id: "booking-4",
    userId: "user-1",
    parkingSlotId: "slot-a1-20",
    parkingAreaId: "area-1",
    vehicleId: "vehicle-1",
    startTime: twoDaysAgo.toISOString(),
    endTime: new Date(twoDaysAgo.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    status: "COMPLETED",
    totalPrice: 10.0,
    paymentStatus: "PAID",
    createdAt: new Date(twoDaysAgo.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(twoDaysAgo.getTime() + 2 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
    parkingSlot: mockParkingSlots["area-1"][19],
    parkingArea: mockParkingAreas[0],
    vehicle: mockVehicles[0],
  },
  {
    id: "booking-5",
    userId: "user-1",
    parkingSlotId: "slot-a2-30",
    parkingAreaId: "area-2",
    vehicleId: "vehicle-2",
    startTime: fourDaysAgo.toISOString(),
    endTime: new Date(fourDaysAgo.getTime() + 1 * 60 * 60 * 1000).toISOString(),
    status: "COMPLETED",
    totalPrice: 7.5,
    paymentStatus: "PAID",
    createdAt: new Date(fourDaysAgo.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(fourDaysAgo.getTime() + 1 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
    parkingSlot: mockParkingSlots["area-2"][29],
    parkingArea: mockParkingAreas[1],
    vehicle: mockVehicles[1],
  },
]

// Mock payment cards
export const mockPaymentCards: PaymentCard[] = [
  {
    id: "card-1",
    userId: "user-1",
    cardholderName: "John Doe",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    cardType: "Visa",
    isDefault: true,
  },
  {
    id: "card-2",
    userId: "user-1",
    cardholderName: "John Doe",
    last4: "1234",
    expiryMonth: "10",
    expiryYear: "2024",
    cardType: "Mastercard",
    isDefault: false,
  },
]

// Utility function to calculate timestamps
const calculateTimestamp = (baseDate: Date, offsetMs: number): string => {
  return new Date(baseDate.getTime() + offsetMs).toISOString();
};

// Mock payments
export const mockPayments: Payment[] = [
  {
    id: "payment-1",
    bookingId: "booking-1",
    userId: "user-1",
    amount: 5.0,
    currency: "USD",
    method: "CREDIT_CARD",
    status: "PAID",
    transactionId: "txn_123456",
    createdAt: calculateTimestamp(now, -30 * 60 * 1000), // 30 minutes ago
    updatedAt: calculateTimestamp(now, -30 * 60 * 1000),
  },
  {
    id: "payment-2",
    bookingId: "booking-2",
    userId: "user-1",
    amount: 15.0,
    currency: "USD",
    method: "CREDIT_CARD",
    status: "PAID",
    transactionId: "txn_234567",
    createdAt: calculateTimestamp(now, -1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: calculateTimestamp(now, -1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "payment-3",
    bookingId: "booking-3",
    userId: "user-1",
    amount: 12.0,
    currency: "USD",
    method: "PAYPAL",
    status: "PAID",
    transactionId: "txn_345678",
    createdAt: calculateTimestamp(now, -12 * 60 * 60 * 1000), // 12 hours ago
    updatedAt: calculateTimestamp(now, -12 * 60 * 60 * 1000),
  },
  {
    id: "payment-4",
    bookingId: "booking-4",
    userId: "user-1",
    amount: 10.0,
    currency: "USD",
    method: "CREDIT_CARD",
    status: "PAID",
    transactionId: "txn_456789",
    createdAt: calculateTimestamp(twoDaysAgo, -1 * 24 * 60 * 60 * 1000), // 1 day before twoDaysAgo
    updatedAt: calculateTimestamp(twoDaysAgo, -1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "payment-5",
    bookingId: "booking-5",
    userId: "user-1",
    amount: 7.5,
    currency: "USD",
    method: "CREDIT_CARD",
    status: "PAID",
    transactionId: "txn_567890",
    createdAt: calculateTimestamp(fourDaysAgo, -2 * 24 * 60 * 60 * 1000), // 2 days before fourDaysAgo
    updatedAt: calculateTimestamp(fourDaysAgo, -2 * 24 * 60 * 60 * 1000),
  },
];
