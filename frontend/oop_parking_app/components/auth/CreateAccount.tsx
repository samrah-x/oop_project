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
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import { BlurView } from 'expo-blur';

// const { width, height } = Dimensions.get('window');

// export function CreateAccount() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);

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

//   const handleCreateAccount = () => {
//     // In a real app, you would validate and create account here
//     router.replace('/(tabs)');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <LinearGradient
//         colors={['#4A00E0', '#8E2DE2']}
//         style={styles.background}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Animated.View
//             style={[
//               styles.formContainer,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             <BlurView intensity={80} tint="light" style={styles.blurContainer}>
//               <Text style={styles.title}>Create Account</Text>
//               <Text style={styles.subtitle}>Join ParkEZ and start parking smarter</Text>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Full Name</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     value={name}
//                     onChangeText={setName}
//                     placeholder="Enter your full name"
//                     placeholderTextColor="#999"
//                     autoCapitalize="words"
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Email</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     value={email}
//                     onChangeText={setEmail}
//                     placeholder="Enter your email"
//                     placeholderTextColor="#999"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Password</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={!showPassword}
//                     placeholder="Create a password"
//                     placeholderTextColor="#999"
//                   />
//                   <TouchableOpacity 
//                     style={styles.eyeIcon}
//                     onPress={() => setShowPassword(!showPassword)}
//                   >
//                     <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Confirm Password</Text>
//                 <View style={styles.inputWrapper}>
//                   <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     secureTextEntry={!showPassword}
//                     placeholder="Confirm your password"
//                     placeholderTextColor="#999"
//                   />
//                 </View>
//               </View>

//               <TouchableOpacity 
//                 style={styles.termsContainer}
//                 onPress={() => setAgreeToTerms(!agreeToTerms)}
//                 activeOpacity={0.7}
//               >
//                 <View style={styles.checkbox}>
//                   {agreeToTerms && (
//                     <Ionicons name="checkmark" size={16} color="#4A00E0" />
//                   )}
//                 </View>
//                 <Text style={styles.termsText}>
//                   I agree to the <Text style={styles.termsLink}>Terms and Conditions</Text> for ParkEZ
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={[
//                   styles.createButton,
//                   !agreeToTerms && styles.disabledButton
//                 ]} 
//                 onPress={handleCreateAccount}
//                 disabled={!agreeToTerms}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={agreeToTerms ? ['#4A00E0', '#8E2DE2'] : ['#CCCCCC', '#AAAAAA']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.gradient}
//                 >
//                   <Text style={styles.createButtonText}>Create Account</Text>
//                 </LinearGradient>
//               </TouchableOpacity>

//               <View style={styles.orContainer}>
//                 <View style={styles.line} />
//                 <Text style={styles.orText}>or sign up with</Text>
//                 <View style={styles.line} />
//               </View>

//               <View style={styles.socialContainer}>
//                 <TouchableOpacity style={styles.socialButton}>
//                   <Image
//                     source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
//                     style={styles.socialIcon}
//                   />
//                 </TouchableOpacity>
                
//                 <TouchableOpacity style={styles.socialButton}>
//                   <Ionicons name="logo-apple" size={24} color="#000" />
//                 </TouchableOpacity>
                
//                 <TouchableOpacity style={styles.socialButton}>
//                   <Ionicons name="logo-facebook" size={24} color="#4267B2" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.loginContainer}>
//                 <Text style={styles.loginText}>Already have an account? </Text>
//                 <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
//                   <Text style={styles.loginLink}>Login</Text>
//                 </TouchableOpacity>
//               </View>
//             </BlurView>
//           </Animated.View>
//         </ScrollView>
//       </LinearGradient>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
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
//     paddingVertical: 40,
//   },
//   formContainer: {
//     width: width * 0.9,
//     maxWidth: 400,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   blurContainer: {
//     padding: 24,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 16,
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
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
//   termsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#4A00E0',
//     borderRadius: 4,
//     marginRight: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   termsText: {
//     fontSize: 14,
//     color: '#666',
//     flex: 1,
//   },
//   termsLink: {
//     color: '#4A00E0',
//     fontWeight: '600',
//   },
//   createButton: {
//     height: 56,
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginBottom: 24,
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   gradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   createButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   orText: {
//     marginHorizontal: 16,
//     color: '#666',
//     fontSize: 14,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 24,
//   },
//   socialButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   socialIcon: {
//     width: 24,
//     height: 24,
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   loginText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   loginLink: {
//     color: '#4A00E0',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });