import React from 'react';  // Import React
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import ProfileScreen from './Main';
import Feed from './Home';
import NotificationsComponent from './Notifications';
import UserProfileComponent from './Profile';
import AddTripForm from './AddTrip';
import OrdersList from './Orders';
import { View } from 'react-native';
import syncUsers from './util';
import { useEffect } from 'react';
const Tab = createBottomTabNavigator();

export default function MyTabs(props) {
  console.log(props);
  useEffect(() => { 
    syncUsers(); // Sync Cognito user with Firebase on app load
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,  // Hides labels for a cleaner look
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: '#ffffff',  // Change to your desired color
          borderRadius: 15,
          height: 70,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 3.5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersList}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name={focused ? "wallet" : "wallet-outline"} color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Trips"
        component={AddTripForm}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name={focused ? "wallet-travel" : "wallet-travel"} color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={NotificationsComponent}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name={focused ? "chat" : "chat-outline"} color={color} size={size} />
            </View>
          ),
          // tabBarBadge: 3,  // Example badge for notifications
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileComponent}
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name={focused ? "account" : "account-outline"} color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
