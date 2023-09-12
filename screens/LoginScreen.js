import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const LoginSignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
  };

  const handleSignUp = () => {
    // Implement your sign-up logic here
  };

  return (
    <ImageBackground
      source={require('./background-image.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover" 
      position='relative'
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {isSignUp ? 'Create Account' : 'Welcome to ParcelPal'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={isSignUp ? handleSignUp : handleLogin}
        >
          <Text style={styles.buttonText}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsSignUp(!isSignUp)}
        >
          <Text style={styles.toggleText}>
            {isSignUp
              ? 'Already have an account? Log In'
              : 'Don’t have an account? Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'aquamarine',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleText: {
    marginTop: 20,
    color: 'grey',
    textDecorationLine: 'underline',
  },
});

export default LoginSignUpScreen;
