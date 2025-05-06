// services/authService.ts
// Authentication service for handling user authentication

import type { User, AuthResponse, LoginCredentials, RegisterData } from "../types"

// Mock user database
const users: Array<User & { password: string }> = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "Password123!",
    phone: "+1234567890",
  },
]

/**
 * Authenticate a user with email and password
 * @param email User email
 * @param password User password
 * @returns Authentication response with user data and token
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by email
  const user = users.find((u) => u.email === credentials.email)

  if (!user) {
    return { success: false, message: "User not found" }
  }

  if (user.password !== credentials.password) {
    return { success: false, message: "Invalid password" }
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user

  return {
    success: true,
    user: userWithoutPassword,
    token: "mock-jwt-token",
  }
}

/**
 * Register a new user
 * @param userData User registration data
 * @returns Authentication response with new user data and token
 */
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = users.find((u) => u.email === userData.email)

  if (existingUser) {
    return { success: false, message: "Email already in use" }
  }

  // Create new user
  const newUser = {
    id: String(users.length + 1),
    ...userData,
  }

  users.push(newUser as User & { password: string })

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser

  return {
    success: true,
    user: userWithoutPassword,
    token: "mock-jwt-token",
  }
}

/**
 * Log out the current user
 * @returns Success response
 */
export const logout = async (): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { success: true }
}

/**
 * Validate email format
 * @param email Email to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param password Password to validate
 * @returns Object with validation result and message
 */
export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" }
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" }
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" }
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" }
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character" }
  }

  return { valid: true, message: "Password is valid" }
}
