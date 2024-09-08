import { Navigation } from "react-native-navigation";
import { AppRegistry } from 'react-native';
import awsExports from './aws-exports';
import { Amplify, Auth } from 'aws-amplify';
import { name as appName } from './app.json';
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from "./AuthProvider";
import Profile from "./screens/Profile";
import MainApp from "./screens/Main";
import SplashScreenComponent from "./screens/SplashScreen"; // Import the splash screen

Amplify.configure(awsExports);
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDGZh1gVo2JiL1s5ff6esryupcKR0Yw584",
//   authDomain: "airmeeds.firebaseapp.com",
//   projectId: "airmeeds",
//   storageBucket: "airmeeds.appspot.com",
//   messagingSenderId: "615002303745",
//   appId: "1:615002303745:web:71387b2f737348ea707f00",
//   measurementId: "G-CT80GRVM5J"
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const db = firebase.firestore();

// Register all components
Navigation.registerComponent('LoginScreen', () => (props) => <AuthProvider><LoginScreen {...props} /></AuthProvider>);
Navigation.registerComponent('ProfileScreen', () => (props) => <AuthProvider><MainApp {...props} /></AuthProvider>);
Navigation.registerComponent('SplashScreen', () => SplashScreenComponent); // Register the splash screen

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    background: {
      color: '#3498db',
    },
    title: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      text: "Hello"
    },
    backButton: {
      color: 'yellow',
      visible: false
    },
  },
});

// Initial Root Setup
Navigation.events().registerAppLaunchedListener(async () => {
  try {
    // Check if user is authenticated
    const user = await Auth.currentAuthenticatedUser();

    // If authenticated, navigate to Profile/MainApp
    setProfileRoot(); // or setMainAppRoot() based on your main screen

  } catch (error) {
    // If not authenticated, navigate to Login
    setLoginRoot();
  }
});

// Function to Navigate to Profile After Login
export function setProfileRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'ProfileScreen', // Set profile screen as the root after login
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function setLoginRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'LoginScreen', // Set LoginScreen as the root
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
}
