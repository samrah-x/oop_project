"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Define user type
interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

// Define context type
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<boolean>
  updateProfile: (userData: Partial<User>) => Promise<boolean>
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  resetPassword: async () => false,
  updateProfile: async () => false,
})

// Auth provider props
interface AuthProviderProps {
  children: ReactNode
}

// Create provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  // Update the register function to handle more detailed user data
  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful registration with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      const userData: User = {
        id: "1",
        name: name,
        email: email,
        phone: phone || "+1 (555) 123-4567", // Use provided phone or default
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      }

      // Save user data to storage
      await AsyncStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Update the login function to better handle user data
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful login with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      // In a real app, this data would come from your backend
      const userData: User = {
        id: "1",
        name: email.split("@")[0], // Use part of email as name for demo
        email: email,
        phone: "+1 (555) 123-4567",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      }

      // Save user data to storage
      await AsyncStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Reset password function
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // In a real app, you would make an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
      return true
    } catch (error) {
      console.error("Reset password error:", error)
      return false
    }
  }

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Update profile function
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true)

      // In a real app, you would make an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

      if (!user) return false

      const updatedUser = { ...user, ...userData }
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      return true
    } catch (error) {
      console.error("Update profile error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)
