// "use client"

// import { useState, useEffect } from "react"
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { router } from "expo-router"
// import BottomNavbar from "../components/BottomNavbar"

// interface PaymentMethod {
//   id: string
//   type: "card" | "paypal" | "apple" | "google"
//   name: string
//   details: string
//   isDefault: boolean
//   icon: string
// }

// export default function PaymentMethodsScreen() {
//   const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)

//   // API endpoint configuration
//   const API_BASE_URL = "https://your-backend-api.com"

//   /**
//    * Fetch payment methods from backend
//    */
//   useEffect(() => {
//     const fetchPaymentMethods = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         // In a real implementation, use actual API call
//         // const response = await fetch(`${API_BASE_URL}/api/payment-methods`);
//         // if (!response.ok) throw new Error('Failed to fetch payment methods');
//         // const data = await response.json();

//         // For demo purposes only - replace with actual API call
//         setTimeout(() => {
//           const mockPaymentMethods: PaymentMethod[] = [
//             {
//               id: "1",
//               type: "card",
//               name: "Visa ending in 4242",
//               details: "Expires 12/25",
//               isDefault: true,
//               icon: "card-outline",
//             },
//             {
//               id: "2",
//               type: "paypal",
//               name: "PayPal",
//               details: "john.doe@example.com",
//               isDefault: false,
//               icon: "logo-paypal",
//             },
//           ]

//           setPaymentMethods(mockPaymentMethods)
//           setLoading(false)
//         }, 1000)
//       } catch (err) {
//         console.error("Error fetching payment methods:", err)
//         setError("Failed to load payment methods")
//         setLoading(false)
//       }
//     }

//     fetchPaymentMethods()
//   }, [])

//   /**
//    * Set a payment method as default
//    */
//   const handleSetDefault = (id: string) => {
//     // In a real implementation, make an API call to update the default payment method
//     setPaymentMethods((prevMethods) =>
//       prevMethods.map((method) => ({
//         ...method,
//         isDefault: method.id === id,
//       })),
//     )

//     Alert.alert("Success", "Default payment method updated")
//   }

//   /**
//    * Delete a payment method
//    */
//   const handleDelete = (id: string) => {
//     Alert.alert("Delete Payment Method", "Are you sure you want to delete this payment method?", [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => {
//           // In a real implementation, make an API call to delete the payment method
//           setPaymentMethods((prevMethods) => prevMethods.filter((method) => method.id !== id))
//         },
//       },
//     ])
//   }

//   /**
//    * Add a new payment method
//    */
//   const handleAddPaymentMethod = () => {
//     router.push("/add-payment-method")
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Payment Methods</Text>
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#4A00E0" />
//           <Text style={styles.loadingText}>Loading payment methods...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.errorContainer}>
//           <Ionicons name="alert-circle" size={50} color="#ff6b6b" />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={() => router.replace("../payment-methods")}>
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <ScrollView style={styles.content}>
//           {paymentMethods.length === 0 ? (
//             <View style={styles.emptyContainer}>
//               <Ionicons name="card-outline" size={80} color="#666" />
//               <Text style={styles.emptyTitle}>No Payment Methods</Text>
//               <Text style={styles.emptySubtitle}>Add a payment method to make bookings easier</Text>
//               <TouchableOpacity style={styles.addButton} onPress={handleAddPaymentMethod}>
//                 <Text style={styles.addButtonText}>Add Payment Method</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <>
//               <Text style={styles.sectionTitle}>Your Payment Methods</Text>

//               {paymentMethods.map((method) => (
//                 <View key={method.id} style={styles.paymentMethodCard}>
//                   <View style={styles.paymentMethodHeader}>
//                     <View style={styles.paymentMethodIcon}>
//                       <Ionicons name={method.icon as any} size={24} color="#fff" />
//                     </View>
//                     <View style={styles.paymentMethodInfo}>
//                       <Text style={styles.paymentMethodName}>{method.name}</Text>
//                       <Text style={styles.paymentMethodDetails}>{method.details}</Text>
//                     </View>
//                     {method.isDefault && (
//                       <View style={styles.defaultBadge}>
//                         <Text style={styles.defaultBadgeText}>Default</Text>
//                       </View>
//                     )}
//                   </View>

//                   <View style={styles.paymentMethodActions}>
//                     {!method.isDefault && (
//                       <TouchableOpacity style={styles.actionButton} onPress={() => handleSetDefault(method.id)}>
//                         <Text style={styles.actionButtonText}>Set as Default</Text>
//                       </TouchableOpacity>
//                     )}
//                     <TouchableOpacity
//                       style={[styles.actionButton, styles.deleteButton]}
//                       onPress={() => handleDelete(method.id)}
//                     >
//                       <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))}

//               <TouchableOpacity style={styles.addNewButton} onPress={handleAddPaymentMethod}>
//                 <Ionicons name="add-circle-outline" size={20} color="#fff" />
//                 <Text style={styles.addNewButtonText}>Add New Payment Method</Text>
//               </TouchableOpacity>

//               <View style={styles.securityNote}>
//                 <Ionicons name="shield-checkmark-outline" size={20} color="#4A00E0" />
//                 <Text style={styles.securityNoteText}>
//                   Your payment information is encrypted and securely stored. We never store your full card details on
//                   our servers.
//                 </Text>
//               </View>
//             </>
//           )}

//           <View style={styles.bottomSpace} />
//         </ScrollView>
//       )}

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
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#ccc",
//     fontSize: 16,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     marginTop: 10,
//     color: "#ccc",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   retryButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: "#4A00E0",
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 50,
//   },
//   emptyTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#fff",
//     marginTop: 15,
//     marginBottom: 8,
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: "#ccc",
//     marginBottom: 25,
//     textAlign: "center",
//   },
//   addButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     backgroundColor: "#4A00E0",
//     borderRadius: 10,
//   },
//   addButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 15,
//   },
//   paymentMethodCard: {
//     backgroundColor: "#222",
//     borderRadius: 12,
//     marginBottom: 15,
//     overflow: "hidden",
//   },
//   paymentMethodHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#333",
//   },
//   paymentMethodIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#4A00E0",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   paymentMethodInfo: {
//     flex: 1,
//   },
//   paymentMethodName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 4,
//   },
//   paymentMethodDetails: {
//     fontSize: 14,
//     color: "#ccc",
//   },
//   defaultBadge: {
//     backgroundColor: "#4A00E0",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   defaultBadgeText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   paymentMethodActions: {
//     flexDirection: "row",
//     padding: 15,
//   },
//   actionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#4A00E0",
//     marginRight: 10,
//   },
//   actionButtonText: {
//     color: "#4A00E0",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   deleteButton: {
//     borderColor: "#ff6b6b",
//   },
//   deleteButtonText: {
//     color: "#ff6b6b",
//   },
//   addNewButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#4A00E0",
//     borderRadius: 8,
//     padding: 15,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   addNewButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 8,
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
