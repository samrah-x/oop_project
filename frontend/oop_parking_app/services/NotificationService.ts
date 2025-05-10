// import * as Notifications from "../mocks/expo-notifications"
// import { Platform } from "react-native"
// import AsyncStorage from "@react-native-async-storage/async-storage"

// // Configure notification behavior
// // Notifications.setNotificationHandler({
// //   handleNotification: async () => ({
// //     shouldShowAlert: true,
// //     shouldPlaySound: true,
// //     shouldSetBadge: true,
// //   }),
// // })

// export class NotificationService {
//   /**
//    * Request permission to send notifications
//    */
//   static async requestPermissions() {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync()
//     let finalStatus = existingStatus

//     // Only ask if permissions have not already been determined
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync()
//       finalStatus = status
//     }

//     // Save the permission status
//     await AsyncStorage.setItem("notificationPermission", finalStatus)

//     return finalStatus === "granted"
//   }

//   /**
//    * Register for push notifications
//    */
//   static async registerForPushNotifications() {
//     try {
//       // Check if permission is granted
//       const permissionGranted = await this.requestPermissions()
//       if (!permissionGranted) {
//         return null
//       }

//       // Get the token
//       const token = await Notifications.getExpoPushTokenAsync({
//         projectId: "your-project-id", // Replace with your actual project ID
//       })

//       // Store the token
//       await AsyncStorage.setItem("pushToken", token.data)

//       // Platform-specific setup
//       if (Platform.OS === "android") {
//         Notifications.setNotificationChannelAsync("default", {
//           name: "default",
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: "#4A00E0",
//         })
//       }

//       return token.data
//     } catch (error) {
//       console.error("Error registering for push notifications:", error)
//       return null
//     }
//   }

//   /**
//    * Schedule a local notification
//    */
//   static async scheduleLocalNotification(title: string, body: string, data: any = {}, seconds = 1) {
//     return await Notifications.scheduleNotificationAsync({
//       content: {
//         title,
//         body,
//         data,
//         sound: true,
//       },
//       trigger: {
//         seconds,
//       },
//     })
//   }

//   /**
//    * Cancel all scheduled notifications
//    */
//   static async cancelAllNotifications() {
//     await Notifications.cancelAllScheduledNotificationsAsync()
//   }

//   /**
//    * Send the push token to the backend
//    */
//   static async sendPushTokenToBackend(token: string) {
//     try {
//       // In a real implementation, make an API call to save the token
//       // const response = await fetch('https://your-backend-api.com/api/push-tokens', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
//       //   },
//       //   body: JSON.stringify({ token }),
//       // });
//       // return response.ok;

//       // For demo purposes only
//       console.log("Push token sent to backend:", token)
//       return true
//     } catch (error) {
//       console.error("Error sending push token to backend:", error)
//       return false
//     }
//   }
// }
