// "use client"

// import { useState } from "react"
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ActivityIndicator,
//   useColorScheme,
//   Alert,
// } from "react-native"
// import { router } from "expo-router"
// import { Ionicons } from "@expo/vector-icons"
// import { FontAwesome5 } from "@expo/vector-icons"
// import { useAuth } from "../../hooks/useAuth"
// import Colors from "../../constants/Colors"
// import type { RegisterData } from "../../types"

// /**
//  * Signup screen
//  */
// export default function SignupScreen() {
//   const { register, validateEmail, validatePassword } = useAuth()
//   const colorScheme = useColorScheme()
//   const theme = colorScheme === "dark" ? Colors.dark : Colors.light

//   const [formData, setFormData] = useState<RegisterData>({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//   })
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//   })

//   // Update form data
//   const handleChange = (field: keyof RegisterData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   // Validate form
//   const validateForm = () => {
//     let isValid = true
//     const newErrors = {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//     }

//     // Validate name
//     if (!formData.name) {
//       newErrors.name = "Name is required"
//       isValid = false
//     }

//     // Validate email
//     if (!formData.email) {
//       newErrors.email = "Email is required"
//       isValid = false
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = "Please enter a valid email"
//       isValid = false
//     }

//     // Validate password
//     if (!formData.password) {
//       newErrors.password = "Password is required"
//       isValid = false
//     } else {
//       const passwordValidation = validatePassword(formData.password)
//       if (!passwordValidation.valid) {
//         newErrors.password = passwordValidation.message
//         isValid = false
//       }
//     }

//     // Validate confirm password
//     if (formData.password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match"
//       isValid = false
//     }

//     // Validate phone (optional)
//     if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
//       newErrors.phone = "Please enter a valid phone number"
//       isValid = false
//     }

//     setErrors(newErrors)
//     return isValid
//   }

//   // Handle signup
//   const handleSignup = async () => {
//     if (!validateForm()) return

//     try {
//       setLoading(true)
//       const result = await register(formData)

//       if (result.success) {
//         Alert.alert("Success", "Account created successfully!", [
//           { text: "OK", onPress: () => router.replace("/tabs") },
//         ])
//       } else {
//         Alert.alert("Registration Failed", result.message || "Failed to create account")
//       }
//     } catch (error) {
//       console.error("Registration error:", error)
//       Alert.alert("Error", "An unexpected error occurred. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <KeyboardAvoidingView
//       style={[styles.container, { backgroundColor: theme.background }]}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color={theme.text} />
//           </TouchableOpacity>
//           <View style={styles.logoContainer}>
//             <FontAwesome5 name="parking" size={40} color={theme.primary} />
//             <Text style={[styles.appName, { color: theme.text }]}>ParkEZ</Text>
//           </View>
//           <View style={styles.placeholder} />
//         </View>

//         <View style={styles.formContainer}>
//           <Text style={[styles.welcomeText, { color: theme.text }]}>Create Account</Text>
//           <Text style={[styles.subtitle, { color: theme.textDim }]}>Sign up to get started</Text>

//           {/* Name Input */}
//           <View style={styles.inputGroup}>
//             <Text style={[styles.inputLabel, { color: theme.text }]}>Full Name</Text>
//             <View
//               style={[
//                 styles.inputContainer,
//                 { backgroundColor: theme.card, borderColor: errors.name ? theme.error : theme.border },
//               ]}
//             >
//               <Ionicons name="person-outline" size={20} color={theme.textDim} style={styles.inputIcon} />
//               <TextInput
//                 style={[styles.input, { color: theme.text }]}
//                 placeholder="Enter your full name"
//                 placeholderTextColor={theme.textDim}
//                 value={formData.name}
//                 onChangeText={(value) => handleChange("name", value)}
//               />
//             </View>
//             {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
//           </View>

//           {/* Email Input */}
//           <View style={styles.inputGroup}>
//             <Text style={[styles.inputLabel, { color: theme.text }]}>Email</Text>
//             <View
//               style={[
//                 styles.inputContainer,
//                 { backgroundColor: theme.card, borderColor: errors.email ? theme.error : theme.border },
//               ]}
//             >
//               <Ionicons name="mail-outline" size={20} color={theme.textDim} style={styles.inputIcon} />
//               <TextInput
//                 style={[styles.input, { color: theme.text }]}
//                 placeholder="Enter your email"
//                 placeholderTextColor={theme.textDim}
//                 value={formData.email}
//                 onChangeText={(value) => handleChange("email", value)}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>
//             {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
//           </View>

//           {/* Phone Input */}
//           <View style={styles.inputGroup}>
//             <Text style={[styles.inputLabel, { color: theme.text }]}>Phone (Optional)</Text>
//             <View
//               style={[
//                 styles.inputContainer,
//                 { backgroundColor: theme.card, borderColor: errors.phone ? theme.error : theme.border },
//               ]}
//             >
//               <Ionicons name="call-outline" size={20} color={theme.textDim} style={styles.inputIcon} />
//               <TextInput
//                 style={[styles.input, { color: theme.text }]}
//                 placeholder="Enter your phone number"
//                 placeholderTextColor={theme.textDim}
//                 value={formData.phone}
//                 onChangeText={(value) => handleChange("phone", value)}
//                 keyboardType="phone-pad"
//               />
//             </View>
//             {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
//           </View>

//           {/* Password Input */}
//           <View style={styles.inputGroup}>
//             <Text style={[styles.inputLabel, { color: theme.text }]}>Password</Text>
//             <View
//               style={[
//                 styles.inputContainer,
//                 { backgroundColor: theme.card, borderColor: errors.password ? theme.error : theme.border },
//               ]}
//             >
//               <Ionicons name="lock-closed-outline" size={20} color={theme.textDim} style={styles.inputIcon} />
//               <TextInput
//                 style={[styles.input, { color: theme.text }]}
//                 placeholder="Create a password"
//                 placeholderTextColor={theme.textDim}
//                 value={formData.password}
//                 onChangeText={(value) => handleChange("password", value)}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={theme.textDim} />
//               </TouchableOpacity>
//             </View>
//             {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
//           </View>

//           {/* Confirm Password Input */}
//           <View style={styles.inputGroup}>
//             <Text style={[styles.inputLabel, { color: theme.text }]}>Confirm Password</Text>
//             <View
//               style={[
//                 styles.inputContainer,
//                 { backgroundColor: theme.card, borderColor: errors.confirmPassword ? theme.error : theme.border },
//               ]}
//             >
//               <Ionicons name="lock-closed-outline" size={20} color={theme.textDim} style={styles.inputIcon} />
//               <TextInput
//                 style={[styles.input, { color: theme.text }]}
//                 placeholder="Confirm your password"
//                 placeholderTextColor={theme.textDim}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry={!showConfirmPassword}
//               />
//               <TouchableOpacity
//                 style={styles.passwordToggle}
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 <Ionicons
//                   name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
//                   size={20}
//                   color={theme.textDim}
//                 />
//               </TouchableOpacity>
//             </View>
//             {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
//           </View>

//           <TouchableOpacity
//             style={[styles.signupButton, { backgroundColor: theme.primary }]}
//             onPress={handleSignup}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Text style={styles.signupButtonText}>Create Account</Text>
//             )}
//           </TouchableOpacity>

//           <View style={styles.loginContainer}>
//             <Text style={[styles.loginText, { color: theme.textDim }]}>Already have an account?</Text>
//             <TouchableOpacity onPress={() => router.push("/auth/login")}>
//               <Text style={[styles.loginLink, { color: theme.primary }]}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   backButton: {
//     padding: 5,
//   },
//   placeholder: {
//     width: 24,
//   },
//   logoContainer: {
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   appName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
//   formContainer: {
//     width: "100%",
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 30,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: 8,
//     height: 50,
//   },
//   inputIcon: {
//     marginHorizontal: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 10,
//   },
//   passwordToggle: {
//     padding: 10,
//   },
//   errorText: {
//     color: "#FF3B30",
//     fontSize: 12,
//     marginTop: 5,
//   },
//   signupButton: {
//     height: 50,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   signupButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   loginContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   loginText: {
//     fontSize: 14,
//     marginRight: 5,
//   },
//   loginLink: {
//     fontSize: 14,
//     fontWeight: "600",
//   },
// })
