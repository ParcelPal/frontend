// AppNavigator.js
import { Navigation } from 'react-native-navigation';

import HomeScreen from './screens/HomeScreen';

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('About', () => HomeScreen);
Navigation.registerComponent('Contact', () => HomeScreen);

const AppNavigator = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
};

export default AppNavigator;
