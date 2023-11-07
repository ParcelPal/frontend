/**
 * @format
 */
import { Navigation } from "react-native-navigation";

import {AppRegistry} from 'react-native';
// import App from './App';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';

import {name as appName} from './app.json';
import { View, Text, StyleSheet  } from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from "./AuthProvider";
import Profile from "./screens/Profile";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainApp from "./screens/Main";

  // Navigation.registerComponent('Login/SignUp', () => LoginScreen);
Amplify.configure(awsExports);
console.log(Platform.OS)
// export default function App() {
//   console.log('hello')
//   return (
//     <NavigationContainer>
//     <AuthProvider>
// <Stack.Navigator initialRouteName="Login/SignUp"  screenOptions={{
//          headerTitleStyle: { fontWeight: 'bold' ,headerBackground: 'powderblue'},
// headerShown: false,
//          headerTitleAlign: 'center',
//          cardStyleInterpolator: ({ current, layouts }) => {
//           return {
//             cardStyle: {
//               transform: [
//                 {
//                   translateX: current.progress.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [layouts.screen.width, 0],
//                   }),
//                 },
//               ],
//             },
//           };
//         }
// }} 
// transitionConfig={(config) =>handleCustomTransition(config)}
// >
//   <Stack.Screen name="Login/SignUp" component={LoginScreen} />
//   <Stack.Screen name="ProfileScreen" component={mainApp}  options={{
//           title: '',
//   }}/>
//     </Stack.Navigator>  
//     </AuthProvider>
//   </NavigationContainer>
//   );
// }
// AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(appName, ()=>(props) =>  <AuthProvider> <LoginScreen {  ...props}/></AuthProvider>);
Navigation.registerComponent('ProfileScreen', ()=>(props) => <AuthProvider>
    <MainApp { ...props}/>
  </AuthProvider>);

// Navigation.registerComponent('ProfileScreen', () => mainApp);
const SettingsScreen = () => {
    return (
      <View style={styles.root}>
        <Text>Settings Screen</Text>
      </View>
    );
  }

  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      background: {
        color: '#3498db', // Set the background color of the header
      },
      title: {
        color: 'white', // Set the text color of the header title
        fontSize: 18, // Set the font size of the header title
        fontWeight: 'bold', // Set the font weight of the header title
        text: "Hello"
      },
      backButton: {
        color: 'yellow', // Set the color of the back button
        visible: false // Set the display of the back button
      },
    },
  });
   
Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
            component: {
              name: 'ProfileScreen',
              id:2,
              options: {
                topBar: {
                  visible: false,
                  drawBehind: false,
                  title: {
                    text: "Profile",
                    color: "#121"
                  }
                },
              },
            },
          },
           {
             component: {
               name: appName,
               id:1,
               options: {
                topBar: {
                  visible: false,
                  
                  title: {
                    text: "Hello",
                    color: "white"
                  }
                },
             },
            },
           },

         ]
       }
     }
  });
});
const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'whitesmoke'
    }
  });