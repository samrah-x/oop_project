// "use client"

// import { useState, useEffect } from "react"
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   FlatList,
//   ActivityIndicator,
//   Switch,
//   Alert,
// } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { router } from "expo-router"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { useNotifications } from "../hooks/useNotifications"
// import BottomNavbar from "../components/BottomNavbar"

// interface Notification {
//   id: string
//   title: string
//   message: string
//   date: string
//   read: boolean
//   type: "booking" | "payment" | "system" | "promotion"
// }

// export default function NotificationsScreen() {
//   const { permissionStatus, registerForPushNotifications, scheduleLocalNotification } = useNotifications()
//   const [notifications, setNotifications] = useState<Notification[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false)

//   // API endpoint configuration
//   const API_BASE_URL = "https://your-backend-api.com"

//   /**
//    * Fetch notifications from backend
//    */
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         // Check notification permission status
//         const storedPermission = await AsyncStorage.getItem("notificationPermission")
//         setNotificationsEnabled(storedPermission === "granted")

//         // In a real implementation, use actual API call
//         // const response = await fetch(`${API_BASE_URL}/api/notifications`);
//         // if (!response.ok) throw new Error('Failed to fetch notifications');
//         // const data = await response.json();

//         // For demo purposes only - replace with actual API call
//         setTimeout(() => {
//           const mockNotifications: Notification[] = [
//             {
//               id: "1",
//               title: "Booking Confirmed",
//               message: "Your booking for Slot A2 in Main Building has been confirmed.",
//               date: "2 hours ago",
//               read: false,
//               type: "booking",
//             },
//             {
//               id: "2",
//               title: "Payment Successful",
//               message: "Your payment of $5.00 for parking has been processed successfully.",
//               date: "Yesterday",
//               read: true,
//               type: "payment",
//             },
//             {
//               id: "3",
//               title: "Special Offer",
//               message: "Get 20% off on your next booking! Use code PARK20.",
//               date: "2 days ago",
//               read: true,
//               type: "promotion",
//             },
//             {
//               id: "4",
//               title: "System Maintenance",
//               message: "Our system will be under maintenance on June 15 from 2 AM to 4 AM.",
//               date: "1 week ago",
//               read: true,
//               type: "system",
//             },
//           ]

//           setNotifications(mockNotifications)
//           setLoading(false)
//         }, 1000)
//       } catch (err) {
//         console.error("Error fetching notifications:", err)
//         setError("Failed to load notifications")
//         setLoading(false)
//       }
//     }

//     fetchNotifications()
//   }, [])

//   /**
//    * Handle notification toggle
//    */
//   const handleNotificationToggle = async (value: boolean) => {
//     if (value) {
//       // Request permission if enabling notifications
//       const granted = await registerForPushNotifications()
//       const isGranted = granted !== undefined && granted !== null
//       setNotificationsEnabled(isGranted)

//       if (isGranted) {
//         // Send a test notification
//         await scheduleLocalNotification(
//           "Notifications Enabled",
//           "You will now receive notifications from ParkEZ",
//           {},
//           2,
//         )
//       }
//     } else {
//       // Confirm before disabling notifications
//       Alert.alert(
//         "Disable Notifications",
//         "Are you sure you want to disable notifications? You may miss important updates about your bookings.",
//         [
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//           {
//             text: "Disable",
//             style: "destructive",
//             onPress: async () => {
//               // In a real app, you would need to handle this differently
//               // as you can't programmatically revoke notification permissions
//               await AsyncStorage.setItem("notificationPermission", "denied")
//               setNotificationsEnabled(false)
//             },
//           },
//         ],
//       )
//     }
//   }

//   /**
//    * Mark notification as read
//    */
//   const markAsRead = (id: string) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) =>
//         notification.id === id ? { ...notification, read: true } : notification,
//       ),
//     )

//     // In a real implementation, make an API call to update the notification status
//     // fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
//     //   method: 'PUT',
//     // });
//   }

//   /**
//    * Delete notification
//    */
//   const deleteNotification = (id: string) => {
//     Alert.alert("Delete Notification", "Are you sure you want to delete this notification?", [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => {
//           setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id))

//           // In a real implementation, make an API call to delete the notification
//           // fetch(`${API_BASE_URL}/api/notifications/${id}`, {
//           //   method: 'DELETE',
//           // });
//         },
//       },
//     ])
//   }

//   /**
//    * Get icon for notification type
//    */
//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case "booking":
//         return <Ionicons name="car" size={24} color="#4A00E0" />
//       case "payment":
//         return <Ionicons name="card" size={24} color="#4CAF50" />
//       case "system":
//         return <Ionicons name="settings" size={24} color="#FF9800" />
//       case "promotion":
//         return <Ionicons name="gift" size={24} color="#E91E63" />
//       default:
//         return <Ionicons name="notifications" size={24} color="#4A00E0" />
//     }
//   }

//   /**
//    * Render a notification item
//    */
//   const renderNotificationItem = ({ item }: { item: Notification }) => {
//     return (
//       <TouchableOpacity
//         style={[styles.notificationItem, !item.read && styles.unreadNotification]}
//         onPress={() => markAsRead(item.id)}
//       >
//         <View style={styles.notificationIcon}>{getNotificationIcon(item.type)}</View>
//         <View style={styles.notificationContent}>
//           <Text style={styles.notificationTitle}>{item.title}</Text>
//           <Text style={styles.notificationMessage}>{item.message}</Text>
//           <Text style={styles.notificationDate}>{item.date}</Text>
//         </View>
//         <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNotification(item.id)}>
//           <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
//         </TouchableOpacity>
//       </TouchableOpacity>
//     )
//   }

//   /**
//    * Mark all notifications as read
//    */
//   const markAllAsRead = () => {
//     setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, read: true })))

//     // In a real implementation, make an API call to update all notifications
//     // fetch(`${API_BASE_URL}/api/notifications/read-all`, {
//     //   method: 'PUT',
//     // });
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Notifications</Text>
//       </View>

//       <View style={styles.settingsContainer}>
//         <View style={styles.settingItem}>
//           <Text style={styles.settingLabel}>Enable Notifications</Text>
//           <Switch
//             value={notificationsEnabled}
//             onValueChange={handleNotificationToggle}
//             trackColor={{ false: "#767577", true: "#4A00E0" }}
//             thumbColor="#f4f3f4"
//           />
//         </View>
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#4A00E0" />
//           <Text style={styles.loadingText}>Loading notifications...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.errorContainer}>
//           <Ionicons name="alert-circle" size={50} color="#ff6b6b" />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={() => router.replace("/notifications")}>
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : notifications.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Ionicons name="notifications-off-outline" size={80} color="#666" />
//           <Text style={styles.emptyTitle}>No Notifications</Text>
//           <Text style={styles.emptySubtitle}>You don't have any notifications yet</Text>
//         </View>
//       ) : (
//         <>
//           <View style={styles.actionsContainer}>
//             <Text style={styles.notificationCount}>
//               {notifications.filter((n) => !n.read).length} unread notifications
//             </Text>
//             {notifications.some((n) => !n.read) && (
//               <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
//                 <Text style={styles.markAllButtonText}>Mark all as read</Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           <FlatList
//             data={notifications}
//             renderItem={renderNotificationItem}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={styles.listContainer}
//             showsVerticalScrollIndicator={false}
//           />
//         </>
//       )}

//       <BottomNavbar currentRoute="home" />
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
//   settingsContainer: {
//     backgroundColor: "#222",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#333",
//   },
//   settingItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   settingLabel: {
//     fontSize: 16,
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
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
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
//     textAlign: "center",
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//   },
//   notificationCount: {
//     fontSize: 14,
//     color: "#aaa",
//   },
//   markAllButton: {
//     padding: 5,
//   },
//   markAllButtonText: {
//     color: "#4A00E0",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   listContainer: {
//     padding: 15,
//     paddingBottom: 80,
//   },
//   notificationItem: {
//     flexDirection: "row",
//     backgroundColor: "#222",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 10,
//   },
//   unreadNotification: {
//     borderLeftWidth: 3,
//     borderLeftColor: "#4A00E0",
//   },
//   notificationIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(74, 0, 224, 0.1)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   notificationContent: {
//     flex: 1,
//   },
//   notificationTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 5,
//   },
//   notificationMessage: {
//     fontSize: 14,
//     color: "#ccc",
//     marginBottom: 5,
//     lineHeight: 20,
//   },
//   notificationDate: {
//     fontSize: 12,
//     color: "#aaa",
//   },
//   deleteButton: {
//     padding: 5,
//   },
// })
