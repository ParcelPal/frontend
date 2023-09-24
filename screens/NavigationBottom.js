import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './Main';
import Home from './Home';
import NotificationsComponent from './Notifications';
import UserProfileComponent from './Profile';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false,
        headerTitleAlign: 'center',
        headerTitle: '',
        headerTransparent: true,
        headerBackTitleVisible: false,
    }}
    >
      <Tab.Screen
        name="Home"
component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
component={NotificationsComponent}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="cart-plus" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Trips"
component={UserProfileComponent}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet-travel" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
component={UserProfileComponent}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
component={UserProfileComponent}
        options={{
      tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}