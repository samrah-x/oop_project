// Mock implementation of expo-notifications
export const setNotificationHandler = (handler: any) => {}

export const getPermissionsAsync = async () => {
  return { status: "granted" }
}

export const requestPermissionsAsync = async () => {
  return { status: "granted" }
}

export const getExpoPushTokenAsync = async (options: any) => {
  return { data: "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]" }
}

export const setNotificationChannelAsync = async (channelId: string, channelConfig: any) => {
  return true
}

export const scheduleNotificationAsync = async (options: any) => {
  return "notification-id"
}

export const cancelAllScheduledNotificationsAsync = async () => {}

export const addNotificationReceivedListener = (listener: any) => {
  return { remove: () => {} }
}

export const addNotificationResponseReceivedListener = (listener: any) => {
  return { remove: () => {} }
}

export const removeNotificationSubscription = (subscription: any) => {}

export const AndroidImportance = {
  MAX: 5,
  HIGH: 4,
  DEFAULT: 3,
  LOW: 2,
  MIN: 1,
}

export type Subscription = {
  remove: () => void
}

export type Notification = {
  request: {
    content: {
      title: string
      body: string
      data: any
    }
    trigger: any
  }
}
