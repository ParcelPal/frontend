import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { withOAuth } from "aws-amplify-react-native";

const LOGO_URL = 'https://example.com/logo.png'; // Replace with your logo URL

const LoginSignUpScreen = function() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const buttonOpacity = useSharedValue(1);  // Default opacity to 1

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with:', email, password);
  };

  // Animated style for button
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,  // Use shared value directly
      transform: [{ scale: buttonOpacity.value }],
    };
  });

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: LOGO_URL }} style={styles.logo} />
        <Text style={styles.title}>Welcome to AirMeeds</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.7}
        onPressIn={() => (buttonOpacity.value = withTiming(0.6, { duration: 200 }))}
        onPressOut={() => (buttonOpacity.value = withTiming(1, { duration: 200 }))}
      >
        <Animated.View style={[styles.button, animatedButtonStyle]}>
          <Text style={styles.buttonText}>Login</Text>
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5A67F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    marginTop: 20,
    color: '#666',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '80%',
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialButtonText: {
    color: '#444',
  },
});
export default withOAuth(LoginSignUpScreen);