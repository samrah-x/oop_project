// Create a central file for navigation types
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

// Define the RootStackParamList to include all your screens
export type RootStackParamList = {
  Welcome: undefined
  CreateAccount: undefined
  Login: undefined
  UserDashboard: undefined
  ProfileScreen: undefined
  ProfileDetails: undefined
  ParkingSpace: undefined
  MyBookings: undefined
  PaymentMethod: undefined
  QRCodeScreen: undefined
}

// Create reusable navigation prop types for each screen
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Welcome">
export type CreateAccountNavigationProp = NativeStackNavigationProp<RootStackParamList, "CreateAccount">
export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">
export type UserDashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, "UserDashboard">
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProfileScreen">
export type ProfileDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProfileDetails">
export type ParkingSpaceNavigationProp = NativeStackNavigationProp<RootStackParamList, "ParkingSpace">
export type MyBookingsNavigationProp = NativeStackNavigationProp<RootStackParamList, "MyBookings">
export type PaymentMethodNavigationProp = NativeStackNavigationProp<RootStackParamList, "PaymentMethod">
export type QRCodeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "QRCodeScreen">

// Define props interfaces for each screen component
export interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp
}

export interface CreateAccountProps {
  navigation: CreateAccountNavigationProp
}

export interface LoginProps {
  navigation: LoginNavigationProp
}

export interface UserDashboardProps {
  navigation: UserDashboardNavigationProp
}

export interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp
}

export interface ProfileDetailsProps {
  navigation: ProfileDetailsNavigationProp
}

export interface ParkingSpaceProps {
  navigation: ParkingSpaceNavigationProp
}

export interface MyBookingsProps {
  navigation: MyBookingsNavigationProp
}

export interface PaymentMethodProps {
  navigation: PaymentMethodNavigationProp
}

export interface QRCodeScreenProps {
  navigation: QRCodeScreenNavigationProp
}
