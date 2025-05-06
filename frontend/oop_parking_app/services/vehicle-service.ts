import apiClient from "../../utils/api-client"
import type { ApiResponse, Vehicle } from "../types"

class VehicleService {
  /**
   * Get user's vehicles
   */
  async getUserVehicles(): Promise<Vehicle[]> {
    try {
      const response = await apiClient.get<ApiResponse<Vehicle[]>>("/vehicles")

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to get vehicles")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Get user vehicles error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Add a new vehicle
   */
  async addVehicle(vehicleData: Omit<Vehicle, "id" | "userId">): Promise<Vehicle> {
    try {
      const response = await apiClient.post<ApiResponse<Vehicle>>("/vehicles", vehicleData)

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to add vehicle")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Add vehicle error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Update a vehicle
   */
  async updateVehicle(id: string, vehicleData: Partial<Omit<Vehicle, "id" | "userId">>): Promise<Vehicle> {
    try {
      const response = await apiClient.put<ApiResponse<Vehicle>>(`/vehicles/${id}`, vehicleData)

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to update vehicle")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Update vehicle error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Delete a vehicle
   */
  async deleteVehicle(id: string): Promise<void> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(`/vehicles/${id}`)

      if (!response.data.success) {
        throw new Error(response.data.error?.message || "Failed to delete vehicle")
      }
    } catch (error: any) {
      console.error("Delete vehicle error:", error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Set a vehicle as default
   */
  async setDefaultVehicle(id: string): Promise<Vehicle> {
    try {
      const response = await apiClient.put<ApiResponse<Vehicle>>(`/vehicles/${id}/default`)

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message || "Failed to set default vehicle")
      }

      return response.data.data
    } catch (error: any) {
      console.error("Set default vehicle error:", error.response?.data || error.message)
      throw error
    }
  }
}

export default new VehicleService()
