// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   Animated,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// export function Login() {
//   const insets = useSafeAreaInsets();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   // Faster animations
//   const fadeAnim = useState(new Animated.Value(0))[0];
//   const slideAnim = useState(new Animated.Value(30))[0]; // Reduced distance
//   const logoAnim = useState(new Animated.Value(0))[0];

//   useEffect(() => {
//     // Run animations simultaneously for better performance
//     Animated.parallel([
//       // Logo animation - faster spring
//       Animated.spring(logoAnim, {
//         toValue: 1,
//         friction: 8,  // Higher friction = less wobble
//         tension: 80,  // Higher tension = faster animation
//         useNativeDriver: true,
//       }),
      
//       // Form animations - reduced duration
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 400, // Faster fade in
//         useNativeDriver: true,
//       }),
      
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 400, // Faster slide
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const handleLogin = () => {
//     // In a real app, you would validate credentials here
//     router.replace('/(tabs)');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <StatusBar barStyle="light-content" />
      
//       <LinearGradient
//         colors={['#070F39', '#0F1854']} // Navy blue gradient
//         style={[styles.background, { paddingTop: insets.top }]}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Logo */}
//           <Animated.View
//             style={[
//               styles.logoContainer,
//               {
//                 transform: [
//                   { scale: logoAnim },
//                   { translateY: logoAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [-30, 0] // Reduced distance
//                   })}
//                 ]
//               }
//             ]}
//           >
//             <View style={styles.logoCircle}>
//               <Ionicons name="car-sport" size={36} color="#FFFFFF" />
//             </View>
//             <Text style={styles.appName}>ParkEZ</Text>
//             <Text style={styles.appTagline}>Smart Parking Solutions</Text>
//           </Animated.View>

//           {/* Form Container */}
//           <Animated.View
//             style={[
//               styles.formContainer,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             <View style={styles.formContent}>
//               <Text style={styles.title}>Welcome Back</Text>
//               <Text style={styles.subtitle}>Sign in to continue to your account</Text>

//               {/* Email Input */}
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Email/Phone number</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="mail-outline" size={20} color="#8D93A8" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     value={email}
//                     onChangeText={setEmail}
//                     placeholder="Enter your email or phone"
//                     placeholderTextColor="#A0A6BA"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                 </View>
//               </View>

//               {/* Password Input */}
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Password</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="lock-closed-outline" size={20} color="#8D93A8" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={!showPassword}
//                     placeholder="Enter your password"
//                     placeholderTextColor="#A0A6BA"
//                   />
//                   <TouchableOpacity 
//                     style={styles.eyeIcon}
//                     onPress={() => setShowPassword(!showPassword)}
//                   >
//                     <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#8D93A8" />
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Remember Me & Forgot Password */}
//               <View style={styles.optionsContainer}>
//                 <TouchableOpacity 
//                   style={styles.rememberContainer}
//                   onPress={() => setRememberMe(!rememberMe)}
//                   activeOpacity={0.7}
//                 >
//                   <View style={[
//                     styles.checkbox,
//                     rememberMe && styles.checkboxActive
//                   ]}>
//                     {rememberMe && (
//                       <Ionicons name="checkmark" size={16} color="#FFFFFF" />
//                     )}
//                   </View>
//                   <Text style={styles.rememberText}>Remember me</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity activeOpacity={0.7}>
//                   <Text style={styles.forgotText}>Forgot Password?</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* Login Button */}
//               <TouchableOpacity 
//                 style={styles.loginButton} 
//                 onPress={handleLogin}
//                 activeOpacity={0.9}
//               >
//                 <LinearGradient
//                   colors={['#0A1852', '#243484']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.gradient}
//                 >
//                   <Text style={styles.loginButtonText}>Login</Text>
//                   <Ionicons name="arrow-forward" size={20} color="#FFF" style={styles.buttonIcon} />
//                 </LinearGradient>
//               </TouchableOpacity>

//               {/* Or section */}
//               <View style={styles.orContainer}>
//                 <View style={styles.line} />
//                 <Text style={styles.orText}>or continue with</Text>
//                 <View style={styles.line} />
//               </View>

//               {/* Social Login Buttons */}
//               <View style={styles.socialContainer}>
//                 <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
//                   <Image
//                     source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
//                     style={styles.socialIcon}
//                   />
//                 </TouchableOpacity>
                
//                 <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
//                   <Ionicons name="logo-apple" size={24} color="#000" />
//                 </TouchableOpacity>
                
//                 <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
//                   <Ionicons name="logo-facebook" size={24} color="#4267B2" />
//                 </TouchableOpacity>
//               </View>

//               {/* Sign Up Link */}
//               <View style={styles.signupContainer}>
//                 <Text style={styles.signupText}>Don't have an account? </Text>
//                 <TouchableOpacity onPress={() => router.replace('/(auth)/signup')} activeOpacity={0.7}>
//                   <Text style={styles.signupLink}>Sign up</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Animated.View>
          
//           {/* Add space at bottom for keyboard */}
//           <View style={{ height: 20 }} />
//         </ScrollView>
//       </LinearGradient>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#070F39', // Navy blue background
//   },
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   logoCircle: {
//     width: 76,
//     height: 76,
//     borderRadius: 38,
//     backgroundColor: '#243484', // Lighter navy
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//     borderWidth: 2,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   appName: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: 4,
//   },
//   appTagline: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.7)',
//   },
//   formContainer: {
//     width: width * 0.9,
//     maxWidth: 380,
//     borderRadius: 24,
//     overflow: 'hidden',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   formContent: {
//     padding: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#070F39',
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 15,
//     color: '#8D93A8',
//     marginBottom: 24,
//   },
//   inputContainer: {
//     marginBottom: 18,
//   },
//   label: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#070F39',
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F7F9FC',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E9ECF5',
//     height: 54,
//   },
//   inputIcon: {
//     marginLeft: 16,
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     paddingHorizontal: 12,
//     fontSize: 15,
//     color: '#070F39',
//   },
//   eyeIcon: {
//     padding: 12,
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   rememberContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#D0D5E5',
//     borderRadius: 4,
//     marginRight: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   checkboxActive: {
//     backgroundColor: '#070F39',
//     borderColor: '#070F39',
//   },
//   rememberText: {
//     fontSize: 14,
//     color: '#5A607F',
//   },
//   forgotText: {
//     fontSize: 14,
//     color: '#070F39',
//     fontWeight: '600',
//   },
//   loginButton: {
//     height: 54,
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginBottom: 26,
//   },
//   gradient: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginRight: 8,
//   },
//   buttonIcon: {
//     marginLeft: 4,
//   },
//   orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E9ECF5',
//   },
//   orText: {
//     marginHorizontal: 16,
//     color: '#8D93A8',
//     fontSize: 14,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 24,
//   },
//   socialButton: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 12,
//     shadowColor: '#070F39',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#F0F3FA',
//   },
//   socialIcon: {
//     width: 24,
//     height: 24,
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   signupText: {
//     color: '#5A607F',
//     fontSize: 14,
//   },
//   signupLink: {
//     color: '#070F39',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });