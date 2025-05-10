import { Slot } from "expo-router"
import { AuthProvider } from "../contexts/AuthContext"

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Use Slot instead of Stack for more direct routing */}
      <Slot />
    </AuthProvider>
  )
}
