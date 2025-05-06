//no farak

// "use client"

// import { useState } from "react"
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { router } from "expo-router"
// import BottomNavbar from "../components/BottomNavbar"

// export default function AddPaymentMethodScreen() {
//   const [activeTab, setActiveTab] = useState<"card" | "paypal">("card")
//   const [cardNumber, setCardNumber] = useState("")
//   const [cardHolder, setCardHolder] = useState("")
//   const [expiryDate, setExpiryDate] = useState("")
//   const [cvv, setCvv] = useState("")
//   const [paypalEmail, setPaypalEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState<{
//     cardNumber?: string
//     cardHolder?: string
//     expiryDate?: string
//     cvv?: string
//     paypalEmail?: string
//   }>({})

//   /**
//    * Format card number with spaces
//    */
//   const formatCardNumber = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
//     const matches = v.match(/\d{4,16}/g)
//     const match = (matches && matches[0]) || ""
//     const parts = []

//     for (let i = 0, len = match.length; i < len; i += 4) {
//       parts.push(match.substring(i, i + 4))
//     }

//     if (parts.length) {
//       return parts.join(" ")
//     } else {
//       return value
//     }
//   }

//   /**
//    * Format expiry date (MM/YY)
//    */
//   const formatExpiryDate = (value: string) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

//     if (v.length > 2) {
//       return `${v.substring(0, 2)}/${v.substring(2, 4)}`
//     }

//     return v
//   }

//   /**
//    * Validate card form
//    */
//   const validateCardForm = () => {
//     const newErrors: {
//       cardNumber?: string
//       cardHolder?: string
//       expiryDate?: string
//       cvv?: string
//     } = {}
//     let isValid = true

//     // Validate card number (should be 16 digits)
//     const cardNumberClean = cardNumber.replace(/\s+/g, "")
//     if (!cardNumberClean) {
//       newErrors.cardNumber = "Card number is required"
//       isValid = false
//     } else if (cardNumberClean.length !== 16) {
//       newErrors.cardNumber = "Card number should be 16 digits"
//       isValid = false
//     }

//     // Validate card holder
//     if (!cardHolder) {
//       newErrors.cardHolder = "Cardholder name is required"
//       isValid = false
//     }

//     // Validate expiry date (should be in MM/YY format)
//     if (!expiryDate) {
//       newErrors.expiryDate = "Expiry date is required"
//       isValid = false
//     } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
//       newErrors.expiryDate = "Expiry date should be in MM/YY format"
//       isValid = false
//     }

//     // Validate CVV (should be 3 or 4 digits)
//     if (!cvv) {
//       newErrors.cvv = "CVV is required"
//       isValid = false
//     } else if (!/^\d{3,4}$/.test(cvv)) {
//       newErrors.cvv = "CVV should be 3 or 4 digits"
//       isValid = false
//     }

//     setErrors(newErrors)
//     return isValid
//   }

//   /**
//    * Validate PayPal form
//    */
//   const validatePayPalForm = () => {
//     const newErrors: {
//       paypalEmail?: string
//     } = {}
//     let isValid = true

//     // Validate PayPal email
//     if (!paypalEmail) {
//       newErrors.paypalEmail = "Email is required"
//       isValid = false
//     } else if (!/\S+@\S+\.\S+/.test(paypalEmail)) {
//       newErrors.paypalEmail = "Please enter a valid email"
//       isValid = false
//     }

//     setErrors(newErrors)
//     return isValid
//   }

//   /**
//    * Handle form submission
//    */
//   const handleSubmit = async () => {
//     // Validate form based on active tab
//     const isValid = activeTab === "card" ? validateCardForm() : validatePayPalForm()
//     if (!isValid) return

//     setIsLoading(true)

//     try {
//       // In a real implementation, make an API call to add the payment method
//       // const response = await fetch('https://your-backend-api.com/api/payment-methods', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify({
//       //     type: activeTab,
//       //     ...(activeTab === 'card' ? {
//       //       cardNumber,
//       //       cardHolder,
//       //       expiryDate,
//       //       cvv,
//       //     } : {
//       //       email: paypalEmail,
//       //     }),
//       //   }),
//       // });
//       // if (!response.ok) throw new Error('Failed to add payment method');

//       // For demo purposes only - simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       Alert.alert("Success", "Payment method added successfully", [
//         {
//           text: "OK",
//           onPress: () => router.back(),
//         },
//       ])
//     } catch (error) {
//       console.error("Add payment method error:", error)
//       Alert.alert("Error", "Failed to add payment method. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add Payment Method</Text>
//       </View>

//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
//         <ScrollView style={styles.content}>
//           <View style={styles.tabContainer}>
//             <TouchableOpacity
//               style={[styles.tab, activeTab === "card" && styles.activeTab]}
//               onPress={() => setActiveTab("card")}
//             >
//               <Ionicons name="card-outline" size={20} color={activeTab === "card" ? "#4A00E0" : "#aaa"} />
//               <Text style={[styles.tabText, activeTab === "card" && styles.activeTabText]}>Credit/Debit Card</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.tab, activeTab === "paypal" && styles.activeTab]}
//               onPress={() => setActiveTab("paypal")}
//             >
//               <Ionicons name="logo-paypal" size={20} color={activeTab === "paypal" ? "#4A00E0" : "#aaa"} />
//               <Text style={[styles.tabText, activeTab === "paypal" && styles.activeTabText]}>PayPal</Text>
//             </TouchableOpacity>
//           </View>

//           {activeTab === "card" ? (
//             <View style={styles.form}>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Card Number</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="card-outline" size={20} color="#aaa" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="1234 5678 9012 3456"
//                     placeholderTextColor="#666"
//                     value={cardNumber}
//                     onChangeText={(text) => setCardNumber(formatCardNumber(text))}
//                     keyboardType="number-pad"
//                     maxLength={19} // 16 digits + 3 spaces
//                   />
//                 </View>
//                 {errors.cardNumber ? <Text style={styles.errorText}>{errors.cardNumber}</Text> : null}
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Cardholder Name</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="person-outline" size={20} color="#aaa" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="John Doe"
//                     placeholderTextColor="#666"
//                     value={cardHolder}
//                     onChangeText={setCardHolder}
//                   />
//                 </View>
//                 {errors.cardHolder ? <Text style={styles.errorText}>{errors.cardHolder}</Text> : null}
//               </View>

//               <View style={styles.rowContainer}>
//                 <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
//                   <Text style={styles.label}>Expiry Date</Text>
//                   <View style={styles.inputWrapper}>
//                     <Ionicons name="calendar-outline" size={20} color="#aaa" style={styles.inputIcon} />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="MM/YY"
//                       placeholderTextColor="#666"
//                       value={expiryDate}
//                       onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
//                       keyboardType="number-pad"
//                       maxLength={5} // MM/YY
//                     />
//                   </View>
//                   {errors.expiryDate ? <Text style={styles.errorText}>{errors.expiryDate}</Text> : null}
//                 </View>

//                 <View style={[styles.inputContainer, { flex: 1 }]}>
//                   <Text style={styles.label}>CVV</Text>
//                   <View style={styles.inputWrapper}>
//                     <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.inputIcon} />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="123"
//                       placeholderTextColor="#666"
//                       value={cvv}
//                       onChangeText={setCvv}
//                       keyboardType="number-pad"
//                       maxLength={4}
//                       secureTextEntry
//                     />
//                   </View>
//                   {errors.cvv ? <Text style={styles.errorText}>{errors.cvv}</Text> : null}
//                 </View>
//               </View>
//             </View>
//           ) : (
//             <View style={styles.form}>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>PayPal Email</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="your.email@example.com"
//                     placeholderTextColor="#666"
//                     value={paypalEmail}
//                     onChangeText={setPaypalEmail}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoComplete="email"
//                   />
//                 </View>
//                 {errors.paypalEmail ? <Text style={styles.errorText}>{errors.paypalEmail}</Text> : null}
//               </View>

//               <View style={styles.paypalInfo}>
//                 <Ionicons name="information-circle-outline" size={20} color="#4A00E0" />
//                 <Text style={styles.paypalInfoText}>
//                   You will be redirected to PayPal to complete the connection to your account.
//                 </Text>
//               </View>
//             </View>
//           )}

//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
//             {isLoading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Text style={styles.submitButtonText}>Add Payment Method</Text>
//             )}
//           </TouchableOpacity>

//           <View style={styles.securityNote}>
//             <Ionicons name="shield-checkmark-outline" size={20} color="#4A00E0" />
//             <Text style={styles.securityNoteText}>
//               Your payment information is encrypted and securely stored. We never store your full card details on our
//               servers.
//             </Text>
//           </View>

//           <View style={styles.bottomSpace} />
//         </ScrollView>
//       </KeyboardAvoidingView>

//       <BottomNavbar currentRoute="profile" />
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#333",
//     backgroundColor: "#111",
//   },
//   backButton: {
//     marginRight: 15,
//     padding: 5,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//     borderRadius: 8,
//     backgroundColor: "#222",
//     padding: 5,
//   },
//   tab: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     borderRadius: 6,
//   },
//   activeTab: {
//     backgroundColor: "#333",
//   },
//   tabText: {
//     color: "#aaa",
//     marginLeft: 8,
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   activeTabText: {
//     color: "#4A00E0",
//     fontWeight: "bold",
//   },
//   form: {
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#fff",
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#222",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#333",
//     height: 50,
//   },
//   inputIcon: {
//     marginLeft: 15,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     color: "#fff",
//     paddingHorizontal: 10,
//   },
//   errorText: {
//     color: "#ff6b6b",
//     fontSize: 12,
//     marginTop: 5,
//   },
//   rowContainer: {
//     flexDirection: "row",
//   },
//   paypalInfo: {
//     flexDirection: "row",
//     backgroundColor: "rgba(74, 0, 224, 0.1)",
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   paypalInfoText: {
//     color: "#ccc",
//     marginLeft: 10,
//     flex: 1,
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   submitButton: {
//     backgroundColor: "#4A00E0",
//     height: 50,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   securityNote: {
//     flexDirection: "row",
//     backgroundColor: "rgba(74, 0, 224, 0.1)",
//     padding: 15,
//     borderRadius: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: "#4A00E0",
//     marginBottom: 20,
//   },
//   securityNoteText: {
//     color: "#ccc",
//     marginLeft: 10,
//     flex: 1,
//     fontSize: 12,
//     lineHeight: 18,
//   },
//   bottomSpace: {
//     height: 80,
//   },
// })
