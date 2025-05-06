// /**
//  * API utility functions for making HTTP requests
//  */

// import AsyncStorage from "@react-native-async-storage/async-storage"
// import type { ApiResponse } from "../types"

// // Base URL for API requests
// const API_BASE_URL = "https://api.parkez.com"

// /**
//  * Generic function to make API requests
//  * @param endpoint API endpoint
//  * @param method HTTP method
//  * @param data Request data
//  * @returns API response
//  */
// export async function apiRequest<T>(
//   endpoint: string,
//   method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
//   data?: any,
// ): Promise<ApiResponse<T>> {
//   try {
//     // Get auth token
//     const token = await AsyncStorage.getItem("token")

//     // Build request options
//     const options: RequestInit = {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//     }

//     // Add request body for non-GET requests
//     if (method !== "GET" && data) {
//       options.body = JSON.stringify(data)
//     }

//     // Make request
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
//     const result = await response.json()

//     // Check for error response
//     if (!response.ok) {
//       return {
//         success: false,
//         message: result.message || `Error: ${response.status}`,
//       }
//     }

//     return {
//       success: true,
//       data: result.data,
//     }
//   } catch (error) {
//     console.error(`API Error (${endpoint}):`, error)
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Unknown error occurred",
//     }
//   }
// }

// /**
//  * GET request helper
//  * @param endpoint API endpoint
//  * @returns API response
//  */
// export function get<T>(endpoint: string): Promise<ApiResponse<T>> {
//   return apiRequest<T>(endpoint, "GET")
// }

// /**
//  * POST request helper
//  * @param endpoint API endpoint
//  * @param data Request data
//  * @returns API response
//  */
// export function post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
//   return apiRequest<T>(endpoint, "POST", data)
// }

// /**
//  * PUT request helper
//  * @param endpoint API endpoint
//  * @param data Request data
//  * @returns API response
//  */
// export function put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
//   return apiRequest<T>(endpoint, "PUT", data)
// }

// /**
//  * DELETE request helper
//  * @param endpoint API endpoint
//  * @returns API response
//  */
// export function del<T>(endpoint: string): Promise<ApiResponse<T>> {
//   return apiRequest<T>(endpoint, "DELETE")
// }
