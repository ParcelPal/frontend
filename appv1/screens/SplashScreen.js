// screens/SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen'; // Import the library

const SplashScreenComponent = ({ componentId }) => {
  useEffect(() => {
    // Hide the splash screen after 2 seconds
    setTimeout(() => {
      SplashScreen.hide();
      // Navigate to the Login screen or your main app
      Navigation.push(componentId, {
        component: {
          name: 'LoginScreen', // Change this if you want a different screen
        },
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreenComponent;
