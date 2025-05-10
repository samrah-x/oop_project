import { Stack } from "expo-router"

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000" },
        animation: "fade", // Add animation for smoother transitions
      }}
    >
      <Stack.Screen name="welcome" options={{ gestureEnabled: false }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  )
}
