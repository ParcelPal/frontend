import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { React, Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        headerStyle: { backgroundColor: 'powderblue',  textStyle: { color: 'white' }},
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: true,
    }}
    >
      <Tab.Screen
    name="Home"
component={Feed}
        options={{
        title: '',
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
component={OrdersList}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="cart-plus" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Trips"
component={AddTripForm }
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet-travel" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
component={NotificationsComponent}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
component={UserProfileComponent}
        options={{
      title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}