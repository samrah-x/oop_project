// "use client"

// import { useState } from "react"
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import type { LoginProps } from "../types/navigation"

// const Login = ({ navigation }: LoginProps) => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.title}>Login !</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email/Phone number</Text>
//           <TextInput
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//             placeholder="Enter your email or phone"
//             keyboardType="email-address"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Password</Text>
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//               placeholder="Enter your password"
//             />
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//               <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.optionsContainer}>
//           <View style={styles.rememberContainer}>
//             <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(!rememberMe)}>
//               {rememberMe && <View style={styles.checkboxInner} />}
//             </TouchableOpacity>
//             <Text style={styles.rememberText}>Remember me</Text>
//           </View>

//           <TouchableOpacity>
//             <Text style={styles.forgotText}>Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("UserDashboard")}>
//           <Text style={styles.loginButtonText}>Login</Text>
//         </TouchableOpacity>

//         <View style={styles.orContainer}>
//           <View style={styles.line} />
//           <Text style={styles.orText}>or login with</Text>
//           <View style={styles.line} />
//         </View>

//         <TouchableOpacity style={styles.googleButton}>
//           <Image
//             source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
//             style={styles.googleIcon}
//           />
//         </TouchableOpacity>

//         <View style={styles.signupContainer}>
//           <Text style={styles.signupText}>Don't have an account? </Text>
//           <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
//             <Text style={styles.signupLink}>Sign up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 5,
//     color: "#666",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 16,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     paddingRight: 10,
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//   },
//   optionsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   rememberContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: "#000",
//     marginRight: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   checkboxInner: {
//     width: 12,
//     height: 12,
//     backgroundColor: "#000",
//   },
//   rememberText: {
//     fontSize: 12,
//     color: "#666",
//   },
//   forgotText: {
//     fontSize: 12,
//     color: "#0047AB",
//   },
//   loginButton: {
//     backgroundColor: "#0047AB",
//     borderRadius: 5,
//     padding: 15,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   loginButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   orContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#ddd",
//   },
//   orText: {
//     marginHorizontal: 10,
//     color: "#666",
//     fontSize: 14,
//   },
//   googleButton: {
//     alignSelf: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//   },
//   signupContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   signupText: {
//     color: "#666",
//   },
//   signupLink: {
//     color: "#0047AB",
//     fontWeight: "bold",
//   },
// })

// export default Login
