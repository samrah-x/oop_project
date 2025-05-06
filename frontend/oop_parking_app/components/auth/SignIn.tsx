// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Dimensions,
//   Animated,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ImageBackground,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useAuth } from '../../contexts/AuthContext';

// const { width, height } = Dimensions.get('window');

// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const { login } = useAuth();

//   // Animation values
//   const fadeAnim = useState(new Animated.Value(0))[0];
//   const slideAnim = useState(new Animated.Value(50))[0];

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const handleSignIn = async () => {
//     if (!email.trim()) {
//       Alert.alert('Error', 'Please enter your email');
//       return;
//     }
//     if (!password.trim()) {
//       Alert.alert('Error', 'Please enter your password');
//       return;
//     }

//     const success = await login(email, password);
//     if (!success) {
//       Alert.alert('Login Failed', 'Invalid email or password');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ImageBackground
//         source={{ uri: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }}
//         style={styles.backgroundImage}
//         blurRadius={3}
//       >
//         <LinearGradient
//           colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
//           style={styles.gradient}
//         >
//           <ScrollView 
//             contentContainerStyle={styles.scrollContainer}
//             keyboardShouldPersistTaps="handled"
//           >
//             <Animated.View 
//               style={[
//                 styles.formContainer,
//                 {
//                   opacity: fadeAnim,
//                   transform: [{ translateY: slideAnim }],
//                 }
//               ]}
//             >
//               <View style={styles.headerContainer}>
//                 <Text style={styles.title}>Welcome Back</Text>
//                 <Text style={styles.subtitle}>Sign in to continue to your account</Text>
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Email</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="mail-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Enter your email"
//                     placeholderTextColor="#A0A0A0"
//                     value={email}
//                     onChangeText={setEmail}
//                     autoCapitalize="none"
//                     keyboardType="email-address"
//                     style={styles.input}
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Password</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Enter your password"
//                     placeholderTextColor="#A0A0A0"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={!showPassword}
//                     style={styles.input}
//                   />
//                   <TouchableOpacity 
//                     style={styles.eyeIcon} 
//                     onPress={() => setShowPassword(!showPassword)}
//                   >
//                     <Ionicons 
//                       name={showPassword ? "eye-off-outline" : "eye-outline"} 
//                       size={20} 
//                       color="#A0A0A0" 
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               <TouchableOpacity style={styles.forgotPassword}>
//                 <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={styles.signInButton}
//                 onPress={handleSignIn}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={['#4A00E0', '#8E2DE2']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.gradient}
//                 >
//                   <Text style={styles.signInButtonText}>Sign In</Text>
//                 </LinearGradient>
//               </TouchableOpacity>

//               <View style={styles.orContainer}>
//                 <View style={styles.orLine} />
//                 <Text style={styles.orText}>OR</Text>
//                 <View style={styles.orLine} />
//               </View>

//               <View style={styles.socialButtonsContainer}>
//                 <TouchableOpacity style={styles.socialButton}>
//                   <Ionicons name="logo-google" size={20} color="#DB4437" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.socialButton}>
//                   <Ionicons name="logo-apple" size={20} color="#000000" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.socialButton}>
//                   <Ionicons name="logo-facebook" size={20} color="#4267B2" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.signUpContainer}>
//                 <Text style={styles.signUpText}>Don't have an account? </Text>
//                 <TouchableOpacity>
//                   <Text style={styles.signUpLink}>Sign Up</Text>
//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//           </ScrollView>
//         </LinearGradient>
//       </ImageBackground>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   gradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: width,
//     paddingVertical: 40,
//   },
//   formContainer: {
//     width: width * 0.9,
//     maxWidth: 400,
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: 20,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 15,
//     elevation: 10,
//   },
//   headerContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     height: 56,
//   },
//   inputIcon: {
//     marginLeft: 16,
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     paddingHorizontal: 12,
//     fontSize: 16,
//     color: '#333',
//   },
//   eyeIcon: {
//     padding: 12,
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 24,
//   },
//   forgotPasswordText: {
//     color: '#8E2DE2',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   signInButton: {
//     height: 56,
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginBottom: 24,
//   },
//   signInButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//     textAlign: 'center',
//     lineHeight: 56,
//   },
//   orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   orLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   orText: {
//     marginHorizontal: 16,
//     color: '#666',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   socialButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 24,
//   },
//   socialButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   signUpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   signUpText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   signUpLink: {
//     fontSize: 14,
//     color: '#8E2DE2',
//     fontWeight: '600',
//   },
// });