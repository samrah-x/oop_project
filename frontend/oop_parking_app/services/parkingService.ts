// services/parkingService.ts
// Parking service for managing parking areas and slots

import { EventEmitter } from "events"
import type { ParkingArea, ParkingResponse, SlotUpdateEvent } from "../types"

// Create event emitter for real-time updates
export const parkingEmitter = new EventEmitter()

// Mock parking areas data
const parkingAreas: ParkingArea[] = [
  {
    id: "1",
    name: "PARKING AREA A",
    location: "Main Building",
    totalSlots: 9,
    availableSlots: 6,
    slots: [
      { id: "A1", name: "A1", isOccupied: false, position: { row: "A", column: 1 } },
      { id: "A2", name: "A2", isOccupied: true, position: { row: "A", column: 2 } },
      { id: "A3", name: "A3", isOccupied: false, position: { row: "A", column: 3 } },
      { id: "B1", name: "B1", isOccupied: false, position: { row: "B", column: 1 } },
      { id: "B2", name: "B2", isOccupied: false, position: { row: "B", column: 2 } },
      { id: "B3", name: "B3", isOccupied: true, position: { row: "B", column: 3 } },
      { id: "C1", name: "C1", isOccupied: false, position: { row: "C", column: 1 } },
      { id: "C2", name: "C2", isOccupied: false, position: { row: "C", column: 2 } },
      { id: "C3", name: "C3", isOccupied: true, position: { row: "C", column: 3 } },
    ],
  },
  {
    id: "2",
    name: "PARKING AREA B",
    location: "East Wing",
    totalSlots: 6,
    availableSlots: 4,
    slots: [
      { id: "D1", name: "D1", isOccupied: false, position: { row: "D", column: 1 } },
      { id: "D2", name: "D2", isOccupied: false, position: { row: "D", column: 2 } },
      { id: "D3", name: "D3", isOccupied: false, position: { row: "D", column: 3 } },
      { id: "E1", name: "E1", isOccupied: true, position: { row: "E", column: 1 } },
      { id: "E2", name: "E2", isOccupied: false, position: { row: "E", column: 2 } },
      { id: "E3", name: "E3", isOccupied: true, position: { row: "E", column: 3 } },
    ],
  },
  {
    id: "3",
    name: "PARKING AREA C",
    location: "West Wing",
    totalSlots: 6,
    availableSlots: 3,
    slots: [
      { id: "F1", name: "F1", isOccupied: true, position: { row: "F", column: 1 } },
      { id: "F2", name: "F2", isOccupied: false, position: { row: "F", column: 2 } },
      { id: "F3", name: "F3", isOccupied: true, position: { row: "F", column: 3 } },
      { id: "G1", name: "G1", isOccupied: false, position: { row: "G", column: 1 } },
      { id: "G2", name: "G2", isOccupied: true, position: { row: "G", column: 2 } },
      { id: "G3", name: "G3", isOccupied: false, position: { row: "G", column: 3 } },
    ],
  },
]

/**
 * Get all parking areas
 * @returns Parking response with all parking areas
 */
export const getParkingAreas = async (): Promise<ParkingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    data: parkingAreas.map((area) => ({
      id: area.id,
      name: area.name,
      location: area.location,
      totalSlots: area.totalSlots,
      availableSlots: area.availableSlots,
    })),
  }
}

/**
 * Get a specific parking area by ID
 * @param areaId Parking area ID
 * @returns Parking response with area details
 */
export const getParkingAreaById = async (areaId: string): Promise<ParkingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const area = parkingAreas.find((a) => a.id === areaId)

  if (!area) {
    return { success: false, message: "Parking area not found" }
  }

  return { success: true, data: area }
}

/**
 * Book a parking slot
 * @param areaId Parking area ID
 * @param slotId Slot ID
 * @param userId User ID
 * @returns Parking response with updated area and slot
 */
export const bookParkingSlot = async (areaId: string, slotId: string, userId: string): Promise<ParkingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const areaIndex = parkingAreas.findIndex((a) => a.id === areaId)

  if (areaIndex === -1) {
    return { success: false, message: "Parking area not found" }
  }

  const slotIndex = parkingAreas[areaIndex].slots!.findIndex((s) => s.id === slotId)

  if (slotIndex === -1) {
    return { success: false, message: "Parking slot not found" }
  }

  if (parkingAreas[areaIndex].slots![slotIndex].isOccupied) {
    return { success: false, message: "Parking slot is already occupied" }
  }

  // Update slot status
  parkingAreas[areaIndex].slots![slotIndex].isOccupied = true
  parkingAreas[areaIndex].availableSlots -= 1

  // Emit real-time update
  parkingEmitter.emit("slotUpdated", {
    areaId,
    slotId,
    isOccupied: true,
  })

  return {
    success: true,
    data: {
      area: parkingAreas[areaIndex],
      slot: parkingAreas[areaIndex].slots![slotIndex],
    },
  }
}

/**
 * Release a parking slot
 * @param areaId Parking area ID
 * @param slotId Slot ID
 * @returns Parking response with updated area and slot
 */
export const releaseParkingSlot = async (areaId: string, slotId: string): Promise<ParkingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const areaIndex = parkingAreas.findIndex((a) => a.id === areaId)

  if (areaIndex === -1) {
    return { success: false, message: "Parking area not found" }
  }

  const slotIndex = parkingAreas[areaIndex].slots!.findIndex((s) => s.id === slotId)

  if (slotIndex === -1) {
    return { success: false, message: "Parking slot not found" }
  }

  if (!parkingAreas[areaIndex].slots![slotIndex].isOccupied) {
    return { success: false, message: "Parking slot is already free" }
  }

  // Update slot status
  parkingAreas[areaIndex].slots![slotIndex].isOccupied = false
  parkingAreas[areaIndex].availableSlots += 1

  // Emit real-time update
  parkingEmitter.emit("slotUpdated", {
    areaId,
    slotId,
    isOccupied: false,
  })

  return {
    success: true,
    data: {
      area: parkingAreas[areaIndex],
      slot: parkingAreas[areaIndex].slots![slotIndex],
    },
  }
}

/**
 * Function to simulate real-time updates (for demo purposes)
 */
export const simulateRealTimeUpdates = (): void => {
  setInterval(() => {
    // Randomly update a parking slot
    const randomAreaIndex = Math.floor(Math.random() * parkingAreas.length)
    const randomSlotIndex = Math.floor(Math.random() * parkingAreas[randomAreaIndex].slots!.length)

    const area = parkingAreas[randomAreaIndex]
    const slot = area.slots![randomSlotIndex]
    const newOccupiedStatus = !slot.isOccupied

    // Update slot status
    slot.isOccupied = newOccupiedStatus
    area.availableSlots = newOccupiedStatus ? area.availableSlots - 1 : area.availableSlots + 1

    // Emit real-time update
    parkingEmitter.emit("slotUpdated", {
      areaId: area.id,
      slotId: slot.id,
      isOccupied: newOccupiedStatus,
    } as SlotUpdateEvent)
  }, 20000) // Every 20 seconds
}

// Start simulation
simulateRealTimeUpdates()
