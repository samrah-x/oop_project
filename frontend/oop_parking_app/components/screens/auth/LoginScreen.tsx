// "use client"

// import { useState } from "react"
// import { View, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { router } from "expo-router"
// import { Input } from "../../ui/Input"
// import { Button } from "../../ui/Button"
// import { Text } from "../../ui/Text"
// import { Divider } from "../../ui/Divider"
// import { useAuth } from "../../../contexts/AuthContext"

// // Removed duplicate styles declaration

// export const LoginScreen = () => {
//   const { login } = useAuth()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [rememberMe, setRememberMe] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

//   const validateForm = () => {
//     const newErrors: { email?: string; password?: string } = {}
//     let isValid = true

//     if (!email) {
//       newErrors.email = "Email is required"
//       isValid = false
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid"
//       isValid = false
//     }

//     if (!password) {
//       newErrors.password = "Password is required"
//       isValid = false
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//       isValid = false
//     }

//     setErrors(newErrors)
//     return isValid
//   }

//   const handleLogin = async () => {
//     if (!validateForm()) return

//     setIsLoading(true)
//     try {
//       await login(email, password)
//       router.replace("/(tabs)")
//     } catch (error) {
//       console.error("Login error:", error)
//       // Error is already handled in the useAuth hook
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleForgotPassword = () => {
//     router.push("../forgot-password")
//   }

//   const handleGoogleLogin = () => {
//     Alert.alert("Google Login", "This feature is not implemented yet")
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.content}>
//           <Text variant="h2" weight="bold" style={styles.title}>
//             Welcome Back
//           </Text>
//           <Text variant="body" color="#666" style={styles.subtitle}>
//             Sign in to continue to ParkEZ
//           </Text>

//           <View style={styles.form}>
//             <Input
//               label="Email"
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Enter your email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               error={errors.email}
//               leftIcon={<Ionicons name="mail-outline" size={20} color="#666" />}
//             />

//             <Input
//               label="Password"
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Enter your password"
//               isPassword
//               error={errors.password}
//               leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#666" />}
//             />

//             <View style={styles.optionsContainer}>
//               <TouchableOpacity style={styles.rememberContainer} onPress={() => setRememberMe(!rememberMe)}>
//                 <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
//                   {rememberMe && <Ionicons name="checkmark" size={14} color="white" />}
//                 </View>
//                 <Text variant="caption" color="#666">
//                   Remember me
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={handleForgotPassword}>
//                 <Text variant="caption" color="#0047AB" weight="medium">
//                   Forgot Password?
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <Button title="Login" onPress={handleLogin} isLoading={isLoading} fullWidth style={styles.loginButton} />

//             <View style={styles.dividerContainer}>
//               <Divider style={styles.divider} />
//               <Text variant="caption" color="#666" style={styles.dividerText}>
//                 or login with
//               </Text>
//               <Divider style={styles.divider} />
//             </View>

//             <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
//               <Image
//                 source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
//                 style={styles.googleIcon}
//               />
//               <Text variant="button" color="#333" weight="medium">
//                 Continue with Google
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.signupContainer}>
//             <Text variant="body" color="#666">
//               Don't have an account?{" "}
//             </Text>
//             <TouchableOpacity onPress={() => router.push("../(auth)/register")}>
//               <Text variant="body" color="#0047AB" weight="semibold">
//                 Sign up
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   content: {
//     flex: 1,
//     padding: 24,
//   },
//   title: {
//     marginTop: 40,
//     marginBottom: 8,
//   },
//   subtitle: {
//     marginBottom: 32,
//   },
//   form: {
//     marginBottom: 24,
//   },
//   optionsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   rememberContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: "#CCC",
//     borderRadius: 4,
//     marginRight: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   checkboxChecked: {
//     backgroundColor: "#0047AB",
//     borderColor: "#0047AB",
//   },
//   loginButton: {
//     marginBottom: 24,
//   },
//   dividerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   divider: {
//     flex: 1,
//   },
//   dividerText: {
//     marginHorizontal: 8,
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F5F5F5",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 24,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 12,
//   },
//   signupContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 16,
//   },
// })
