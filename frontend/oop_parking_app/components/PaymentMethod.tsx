// "use client"

// import { useState } from "react"
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import type { PaymentMethodProps } from "../types/navigation"

// const PaymentMethod = ({ navigation }: PaymentMethodProps) => {
//   const [cardNumber, setCardNumber] = useState("")
//   const [cardHolder, setCardHolder] = useState("")
//   const [expiryDate, setExpiryDate] = useState("")
//   const [cvv, setCvv] = useState("")
//   const [selectedMethod, setSelectedMethod] = useState("card")

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Payment Method</Text>
//       </View>

//       <View style={styles.content}>
//         <View style={styles.cardPreview}>
//           <Image
//             source={{ uri: "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png" }}
//             style={styles.cardImage}
//             resizeMode="contain"
//           />
//           <Text style={styles.cardText}>VISA OR PAYPAL</Text>
//           <Text style={styles.cardSubtext}>You can pay through</Text>
//         </View>

//         <View style={styles.paymentOptions}>
//           <TouchableOpacity
//             style={[styles.paymentOption, selectedMethod === "card" && styles.selectedOption]}
//             onPress={() => setSelectedMethod("card")}
//           >
//             <Text style={styles.paymentOptionText}>Credit/Debit</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.paymentOption, selectedMethod === "paypal" && styles.selectedOption]}
//             onPress={() => setSelectedMethod("paypal")}
//           >
//             <Text style={styles.paymentOptionText}>PayPal</Text>
//           </TouchableOpacity>
//         </View>

//         {selectedMethod === "card" && (
//           <View style={styles.cardForm}>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Card Number</Text>
//               <TextInput
//                 style={styles.input}
//                 value={cardNumber}
//                 onChangeText={setCardNumber}
//                 placeholder="1234 5678 9012 3456"
//                 keyboardType="number-pad"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Card Holder Name</Text>
//               <TextInput style={styles.input} value={cardHolder} onChangeText={setCardHolder} placeholder="John Doe" />
//             </View>

//             <View style={styles.row}>
//               <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
//                 <Text style={styles.label}>Expiry Date</Text>
//                 <TextInput style={styles.input} value={expiryDate} onChangeText={setExpiryDate} placeholder="MM/YY" />
//               </View>

//               <View style={[styles.inputContainer, { flex: 1 }]}>
//                 <Text style={styles.label}>CVV</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={cvv}
//                   onChangeText={setCvv}
//                   placeholder="123"
//                   keyboardType="number-pad"
//                   secureTextEntry
//                 />
//               </View>
//             </View>
//           </View>
//         )}

//         <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate("QRCodeScreen")}>
//           <Text style={styles.payButtonText}>Pay Now</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   cardPreview: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   cardImage: {
//     width: 150,
//     height: 80,
//     marginBottom: 10,
//   },
//   cardText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   cardSubtext: {
//     fontSize: 14,
//     color: "#666",
//   },
//   paymentOptions: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   paymentOption: {
//     flex: 1,
//     padding: 15,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   selectedOption: {
//     borderColor: "#0047AB",
//     backgroundColor: "#f0f8ff",
//   },
//   paymentOptionText: {
//     fontWeight: "bold",
//   },
//   cardForm: {
//     marginBottom: 20,
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
//     padding: 12,
//     fontSize: 16,
//   },
//   row: {
//     flexDirection: "row",
//   },
//   payButton: {
//     backgroundColor: "#0047AB",
//     borderRadius: 5,
//     padding: 15,
//     alignItems: "center",
//   },
//   payButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// })

// export default PaymentMethod
