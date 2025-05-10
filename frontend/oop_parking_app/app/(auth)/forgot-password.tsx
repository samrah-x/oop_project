"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      // In a real app, you would make an API call to your backend
      // const response = await fetch('https://your-api.com/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // For demo purposes, we'll simulate a successful API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
    } catch (error) {
      console.error("Reset password error:", error)
      Alert.alert("Error", "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/(auth)/login")
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/2554/2554966.png" }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>ParkEZ</Text>
          </View>

          {isSubmitted ? (
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={80} color="#4A00E0" />
              <Text style={styles.successTitle}>Email Sent</Text>
              <Text style={styles.successText}>
                We've sent password reset instructions to {email}. Please check your email.
              </Text>
              <TouchableOpacity style={styles.backToLoginButton} onPress={handleBackToLogin}>
                <Text style={styles.backToLoginText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>Enter your email to reset your password</Text>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="#666"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text)
                        setError(null)
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  </View>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>

                <TouchableOpacity
                  style={[styles.resetButton, (!email || isLoading) && styles.resetButtonDisabled]}
                  onPress={handleResetPassword}
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.resetButtonText}>Reset Password</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4A00E0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    height: 50,
  },
  inputIcon: {
    marginLeft: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    paddingHorizontal: 10,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 5,
  },
  resetButton: {
    backgroundColor: "#4A00E0",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  backToLoginButton: {
    backgroundColor: "#4A00E0",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    width: "100%",
  },
  backToLoginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
