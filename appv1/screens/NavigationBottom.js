import React from 'react';  // Import React
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  // Fix import statement
import ProfileScreen from './Main';
import Feed from './Home';
import NotificationsComponent from './Notifications';
import UserProfileComponent from './Profile';
import AddTripForm from './AddTrip';
import OrdersList from './Orders';

const Tab = createBottomTabNavigator();

export default function MyTabs(props) {
  console.log(props);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        // Additional screen options
      }}
    >
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersList}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Trips"
        component={AddTripForm}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet-travel" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={NotificationsComponent}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileComponent}
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
