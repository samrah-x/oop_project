"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  type TextInputProps,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isPassword?: boolean
  helperText?: string
  containerStyle?: any
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  helperText,
  containerStyle = {},
  style = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.focusedInput : null,
          error ? styles.errorInput : null,
          leftIcon ? styles.withLeftIcon : null,
          (rightIcon || isPassword) ? styles.withRightIcon : null,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, style]}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#999"
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity style={styles.rightIconContainer} onPress={togglePasswordVisibility}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#666" />
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
  focusedInput: {
    borderColor: "#0047AB",
  },
  errorInput: {
    borderColor: "#FF3B30",
  },
  withLeftIcon: {
    paddingLeft: 0,
  },
  withRightIcon: {
    paddingRight: 0,
  },
  leftIconContainer: {
    paddingHorizontal: 12,
  },
  rightIconContainer: {
    paddingHorizontal: 12,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
})
