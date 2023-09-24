import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/Main';
import { Amplify } from 'aws-amplify';
import awsExports from '../../../backend1/src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './AuthProvider';

const Stack = createNativeStackNavigator();

Amplify.configure(awsExports);
console.log(Platform.OS)
export default function App() {
  console.log('hello')
  return (
    <NavigationContainer>
    <AuthProvider>
    <Stack.Navigator initialRouteName="Login/SignUp" screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="Login/SignUp" component={LoginScreen} />
  <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{
          title: '',
        }}/>
    </Stack.Navigator>  
    </AuthProvider>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
