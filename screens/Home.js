// component for feed
import React from "react";
import { View, Text, StyleSheet, Button, Image, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { useState } from "react";
import CreateOrder from "./CreateOrder";
const Tab = createMaterialTopTabNavigator();
const imageUrls = [
  "https://images.unsplash.com/photo-1691036561573-4b76998b60de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
  "https://images.unsplash.com/photo-1676902683988-1b59d91ca033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
  "https://images.unsplash.com/photo-1674133015234-8de60fbdbd16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1673563932782-28daf64ff066?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
];
const data = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
  // Add more items as needed
];

// let createOrder = false;

function HomeScreen() {
  const [isOrder, setOrder] = useState(false);


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
{!isOrder && <Button onPress={() => {setOrder(true);  }} title="Create Order">
        Create Order
      </Button>}
      {isOrder && <CreateOrder />}
      {!isOrder && (
        <ScrollView horizontal={true}>
          <FlatList
            data={data}
            horizontal={true} // Render the list horizontally
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  margin: 10,
                  padding: 20,
                  backgroundColor: "lightgray",
                  height: 200,
                  width: 200,
                }}
              >
                <Text>{item.text}</Text>
              </View>
            )}
          />
        </ScrollView>
      )}
<Button onPress={() => setOrder(false)} title="Add to order">
        Cancel
      </Button>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
// console.log('createOrder', createOrder)
const Home = () => {
  return (<Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 11, fontWeight: 700 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
      swipeEnabled={false}
    >
      <Tab.Screen name="Order" component={HomeScreen} />
      <Tab.Screen name="Travel" component={SettingsScreen} />
      <Tab.Screen name="Ship" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  card: {
    width: 220,
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
});

export default Home;
