// // navigation/AuthStack.tsx
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from '../components/auth/Login';
// import SignInScreen from '../components/auth/SignIn';
// import CreateAccountScreen from '../components/auth/CreateAccount';

// const AuthStack = createStackNavigator();

// const AuthStackScreen = () => (
//   <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//     <AuthStack.Screen name="Login" component={LoginScreen} />
//     <AuthStack.Screen name="SignIn" component={SignInScreen} />
//     <AuthStack.Screen name="CreateAccount" component={CreateAccountScreen} />
//   </AuthStack.Navigator>
// );

// export default AuthStackScreen;

// // navigation/MainStack.tsx
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
// import ProfileStack from './ProfileStack';
// import ParkingStack from './ParkingStack';
// import MyBookingsScreen from '../components/booking/MyBookings';

// const Tab = createBottomTabNavigator();

// const MainStackScreen = () => (
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;

//         switch (route.name) {
//           case 'Parking':
//             iconName = focused ? 'car' : 'car-outline';
//             break;
//           case 'MyBookings':
//             iconName = focused ? 'calendar' : 'calendar-outline';
//             break;
//           case 'Profile':
//             iconName = focused ? 'person' : 'person-outline';
//             break;
//           default:
//             iconName = 'help-circle-outline';
//         }

//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//     })}
//   >
//     <Tab.Screen name="Parking" component={ParkingStack} />
//     <Tab.Screen name="MyBookings" component={MyBookingsScreen} />
//     <Tab.Screen name="Profile" component={ProfileStack} />
//   </Tab.Navigator>
// );

// export default MainStackScreen;

// // navigation/ProfileStack.tsx
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import ProfileScreen from '../components/ProfileScreen';
// import ProfileDetailsScreen from '../components/profile/ProfileDetails';
// import PaymentMethodScreen from '../components/payment.tsx/PaymentMethod';

// const Stack = createStackNavigator();

// const ProfileStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ title: 'Profile' }} />
//     <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
//     <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
//   </Stack.Navigator>
// );

// export default ProfileStack;

// // navigation/ParkingStack.tsx
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import ParkingSpaceScreen from '../components/booking/ParkingSpace';
// import QRCodeScreen from '../components/QRCodeScreen';

// const Stack = createStackNavigator();

// const ParkingStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="ParkingSpaces" component={ParkingSpaceScreen} options={{ title: 'Parking Spaces' }} />
//     <Stack.Screen name="QRCode" component={QRCodeScreen} options={{ title: 'Scan QR Code' }} />
//   </Stack.Navigator>
// );

// export default ParkingStack;