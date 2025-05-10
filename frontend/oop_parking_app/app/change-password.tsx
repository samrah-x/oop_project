"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }>({})

  // Update the validateForm function with stronger password validation
  const validateForm = () => {
    const newErrors: {
      currentPassword?: string
      newPassword?: string
      confirmPassword?: string
    } = {}
    let isValid = true

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required"
      isValid = false
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required"
      isValid = false
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
      isValid = false
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter"
      isValid = false
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one number"
      isValid = false
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one special character"
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
      isValid = false
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChangePassword = async () => {
    if (!validateForm()) return

    try {
      setIsLoading(true)

      // In a real implementation, make an API call to change the password
      // const response = await fetch('https://your-backend-api.com/api/user/change-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      //   },
      //   body: JSON.stringify({
      //     currentPassword,
      //     newPassword,
      //   }),
      // });
      // if (!response.ok) throw new Error('Failed to change password');

      // For demo purposes only - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      Alert.alert("Success", "Your password has been changed successfully", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      console.error("Error changing password:", error)
      Alert.alert("Error", "Failed to change password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="lock-closed" size={30} color="#fff" />
          </View>
          <Text style={styles.infoTitle}>Update Your Password</Text>
          <Text style={styles.infoText}>
            Create a strong password that you don't use for other websites. Your new password will be used for logging
            into your account.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Current Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={(text) => {
                  setCurrentPassword(text)
                  if (errors.currentPassword) {
                    setErrors({ ...errors, currentPassword: undefined })
                  }
                }}
                secureTextEntry={!showCurrentPassword}
                placeholder="Enter your current password"
                placeholderTextColor="#666"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Ionicons name={showCurrentPassword ? "eye-off" : "eye"} size={20} color="#aaa" />
              </TouchableOpacity>
            </View>
            {errors.currentPassword ? <Text style={styles.errorText}>{errors.currentPassword}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text)
                  if (errors.newPassword) {
                    setErrors({ ...errors, newPassword: undefined })
                  }
                }}
                secureTextEntry={!showNewPassword}
                placeholder="Enter your new password"
                placeholderTextColor="#666"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color="#aaa" />
              </TouchableOpacity>
            </View>
            {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm New Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text)
                  if (errors.confirmPassword) {
                    setErrors({ ...errors, confirmPassword: undefined })
                  }
                }}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirm your new password"
                placeholderTextColor="#666"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#aaa" />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>

          <View style={styles.passwordTips}>
            <Text style={styles.tipsTitle}>Password Requirements:</Text>
            <View style={styles.tipItem}>
              <Ionicons
                name={newPassword.length >= 8 ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={newPassword.length >= 8 ? "#4CAF50" : "#aaa"}
              />
              <Text style={[styles.tipText, newPassword.length >= 8 && styles.validTip]}>At least 8 characters</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons
                name={/[A-Z]/.test(newPassword) ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={/[A-Z]/.test(newPassword) ? "#4CAF50" : "#aaa"}
              />
              <Text style={[styles.tipText, /[A-Z]/.test(newPassword) && styles.validTip]}>
                At least one uppercase letter
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons
                name={/[0-9]/.test(newPassword) ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={/[0-9]/.test(newPassword) ? "#4CAF50" : "#aaa"}
              />
              <Text style={[styles.tipText, /[0-9]/.test(newPassword) && styles.validTip]}>At least one number</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons
                name={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? "#4CAF50" : "#aaa"}
              />
              <Text style={[styles.tipText, /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) && styles.validTip]}>
                At least one special character
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Update Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#111",
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    backgroundColor: "#0a0a3a",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  infoIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A00E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 8,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 15,
  },
  eyeIcon: {
    padding: 15,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 5,
  },
  passwordTips: {
    backgroundColor: "rgba(74, 0, 224, 0.1)",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  tipText: {
    fontSize: 13,
    color: "#ccc",
    marginLeft: 8,
  },
  changeButton: {
    backgroundColor: "#4A00E0",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  validTip: {
    color: "#4CAF50",
  },
})
