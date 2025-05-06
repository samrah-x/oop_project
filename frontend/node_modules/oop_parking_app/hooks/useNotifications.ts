"use client"

import { useState, useEffect, useRef } from "react"
import * as Notifications from "../mocks/expo-notifications"
import { NotificationService } from "../services/NotificationService"

export function useNotifications() {
  const [notification, setNotification] = useState<any | null>(null)
  const [pushToken, setPushToken] = useState<string | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null)

  const notificationListener = useRef<any>(null) // Changed to any to avoid typing error
  const responseListener = useRef<any>(null)

  useEffect(() => {
    // Register for push notifications
    registerForPushNotifications()

    // Set up notification listeners
    notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
      console.log("Notification response:", response)
      // Handle notification response (e.g., navigate to a specific screen)
    })

    // Clean up listeners on unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current)
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  /**
   * Register for push notifications
   */
  const registerForPushNotifications = async () => {
    try {
      // Request permissions
      const permissionGranted = await NotificationService.requestPermissions()
      setPermissionStatus(permissionGranted ? "granted" : "denied")

      if (!permissionGranted) {
        return
      }

      // Get push token
      const token = await NotificationService.registerForPushNotifications()
      if (token) {
        setPushToken(token)
        // Send token to backend
        await NotificationService.sendPushTokenToBackend(token)
      }
    } catch (error) {
      console.error("Error in registerForPushNotifications:", error)
    }
  }

  /**
   * Schedule a local notification
   */
  const scheduleLocalNotification = async (title: string, body: string, data: any = {}, seconds = 1) => {
    return await NotificationService.scheduleLocalNotification(title, body, data, seconds)
  }

  /**
   * Cancel all scheduled notifications
   */
  const cancelAllNotifications = async () => {
    await NotificationService.cancelAllNotifications()
  }

  return {
    notification,
    pushToken,
    permissionStatus,
    scheduleLocalNotification,
    cancelAllNotifications,
    registerForPushNotifications,
  }
}
