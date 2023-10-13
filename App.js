import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import mainApp from './screens/Main';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './AuthProvider';

import awsConfig from "./aws-exports";
import { fromLeft } from 'react-navigation-transitions';
import CreateOrder from './screens/CreateOrder';

const isLocalhost = Boolean(__DEV__);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
// const [
//   localRedirectSignIn,
//   productionRedirectSignIn,
// ] = awsConfig.oauth.redirectSignIn.split(",");

// const [
//   localRedirectSignOut,
//   productionRedirectSignOut,
// ] = awsConfig.oauth.redirectSignOut.split(",");

// const updatedAwsConfig = {
//   ...awsConfig,
//   oauth: {
//     ...awsConfig.oauth,
//     redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
//     redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
//   }
// }
// Amplify.configure(updatedAwsConfig)
const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
&& prevScene.route.routeName === 'Login/SignUp'
    && nextScene.route.routeName === 'ScreenB') {
    return zoomIn();
  } else if (prevScene
    && prevScene.route.routeName === 'ScreenB'
    && nextScene.route.routeName === 'ScreenC') {
    return zoomOut();
  }
  return fromLeft();
}


const Stack = createNativeStackNavigator();

Amplify.configure(awsExports);
console.log(Platform.OS)
export default function App() {
  console.log('hello')
  return (
    <NavigationContainer>
    <AuthProvider>
<Stack.Navigator initialRouteName="Login/SignUp"  screenOptions={{
         headerTitleStyle: { fontWeight: 'bold' ,headerBackground: 'powderblue'},
headerShown: false,
         headerTitleAlign: 'center',
         cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        }
}} 
transitionConfig={(config) =>handleCustomTransition(config)}
>
  <Stack.Screen name="Login/SignUp" component={LoginScreen} />
  <Stack.Screen name="ProfileScreen" component={mainApp}  options={{
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
