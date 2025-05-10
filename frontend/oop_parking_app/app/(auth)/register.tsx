"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useAuth } from "../../contexts/AuthContext"

export default function RegisterScreen() {
  const { register } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  })

  // Validate fields on change
  useEffect(() => {
    validateField("name", name)
  }, [name])

  useEffect(() => {
    validateField("email", email)
  }, [email])

  useEffect(() => {
    validateField("password", password)
  }, [password])

  // Validate individual fields
  const validateField = (field: string, value: string) => {
    let error = ""

    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "Name is required"
        }
        break
      case "email":
        if (!value.trim()) {
          error = "Email is required"
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          error = "Please enter a valid email address"
        }
        break
      case "password":
        if (!value) {
          error = "Password is required"
        } else if (value.length < 12) {
          error = "Password must be at least 12 characters"
        } else if (!/[A-Z]/.test(value)) {
          error = "Password must contain at least one uppercase letter"
        } else if (!/[0-9]/.test(value)) {
          error = "Password must contain at least one number"
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error = "Password must contain at least one special character"
        }
        break
      default:
        break
    }

    setErrors(prev => ({ ...prev, [field]: error }))
    return !error
  }

  // Validate whole form
  const validateForm = () => {
    const nameValid = validateField("name", name)
    const emailValid = validateField("email", email)
    const passwordValid = validateField("password", password)
    
    return nameValid && emailValid && passwordValid
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const success = await register(name, email, password)
      if (success) {
        // Navigate to the home screen
        router.replace("/home")
      } else {
        Alert.alert("Registration Failed", "Could not create account. Please try again.")
      }
    } catch (error) {
      console.error("Registration failed:", error)
      Alert.alert("Registration Failed", "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    router.push("/(auth)/login")
  }

  const isFormValid = !errors.name && !errors.email && !errors.password && name && email && password

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/2554/2554966.png" }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>ParkEZ</Text>
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started with ParkEZ</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <View style={[styles.inputWrapper, errors.name ? styles.inputError : null]}>
                <Ionicons name="person-outline" size={20} color="#D9D9D9" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={[styles.inputWrapper, errors.email ? styles.inputError : null]}>
                <Ionicons name="mail-outline" size={20} color="#D9D9D9" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#666"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.inputWrapper, errors.password ? styles.inputError : null]}>
                <Ionicons name="lock-closed-outline" size={20} color="#D9D9D9" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password (12+ characters)"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#D9D9D9" />
                </TouchableOpacity>
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              {password && !errors.password && (
                <Text style={styles.successText}>Password meets all requirements</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.registerButton, !isFormValid && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.registerButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070F39",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: "#D9D9D9",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#D9D9D9",
    marginBottom: 36,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(217, 217, 217, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(217, 217, 217, 0.3)",
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: "#4a0404",
    borderWidth: 0.5,
  },
  inputIcon: {
    marginLeft: 18,
  },
  input: {
    flex: 1,
    height: 56,
    color: "#fff",
    paddingHorizontal: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  errorText: {
    color: "#f2eded",
    fontSize: 13,
    marginTop: 8,
    marginLeft: 4,
  },
  successText: {
    color: "#4cd964",
    fontSize: 13,
    marginTop: 8,
    marginLeft: 4,
  },
  registerButton: {
    backgroundColor: "#fff",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  registerButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  registerButtonText: {
    color: "#070F39",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 36,
  },
  loginText: {
    color: "#D9D9D9",
    fontSize: 16,
  },
  loginLink: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
    textDecorationLine: "underline",
  },
})