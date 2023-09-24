// component for feed 
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Text>TODO Order!</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
const Feed = () => {
    return (
    <Tab.Navigator screenOptions={{tabBarLabelStyle:{'fontSize':11,'fontWeight':700},    tabBarStyle: { backgroundColor: 'powderblue' },
}}>
      <Tab.Screen name="Order" component={HomeScreen} />
<Tab.Screen name="Travel" component={SettingsScreen} />
<Tab.Screen name="Ship" component={SettingsScreen} />
        </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        }
        }
        );
        
export default Feed;