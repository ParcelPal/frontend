// component for feed
import React from "react";
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, SafeAreaView } from "react-native";
import { Card } from "react-native-elements";
import { Travel } from './Travel';

import { useState } from "react";
import Carousel from 'react-native-snap-carousel';

import CreateOrder from "./CreateOrder";
import { useAuth } from "../AuthProvider";
const Tab = createMaterialTopTabNavigator();
// const imageUrls = [
//   "https://images.unsplash.com/photo-1691036561573-4b76998b60de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
//   "https://images.unsplash.com/photo-1676902683988-1b59d91ca033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
//   "https://images.unsplash.com/photo-1674133015234-8de60fbdbd16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
//   "https://images.unsplash.com/photo-1673563932782-28daf64ff066?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
// ];
// const data = [
//   { id: "1", text: "Item 1" },
//   { id: "2", text: "Item 2" },
//   { id: "3", text: "Item 3" },
//   { id: "4", text: "Item 4" },
//   // Add more items as needed
// ];
// console.log(useAuth());

// let createOrder = false;
const staticOffers = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro',
    image: 'https://m.media-amazon.com/images/I/81AaLA+UjVL._AC_UF1000,1000_QL80_.jpg',
    price: 999.99,
    origin: 'United States',
    offer: 'Special Deal!',
  },
  {
    id: 2,
    name: 'Macbook pro',
    image: 'https://s.yimg.com/uu/api/res/1.2/eANnyQKTuMbJgyq1j7ovbQ--~B/aD0xMjEzO3c9MTk1NzthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2020-12/d37e0460-3eeb-11eb-b7f9-449e864b9135.cf.jpg',
    price: 1599,
    origin: 'United States',
    offer: 'Limited Stock!',
  },
  // Add more static offers
];
const renderItem = ({ item }) => (
  <View style={styles.offerCard}>
    <Image source={{uri: item.image}} style={styles.productImage} />
    <Text>{item.name}</Text>
    <Text>Price: ${item.price}</Text>
    <Text>Origin: {item.origin}</Text>
    <Text>{item.offer}</Text>
    <TouchableOpacity onPress={() => handleBuy(item)}>
      <Text>Buy Now</Text>
    </TouchableOpacity>
  </View>
);
function HomeScreen() {
  const [isOrder, setOrder] = useState(false);
console.log(useAuth())

  return (
    !isOrder ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<TouchableOpacity
          style={styles.button}
          onPress={ ()=>  setOrder(true)}
        >
          <Text style={styles.buttonText}>
            { 'Create Order'}
          </Text>
        </TouchableOpacity>
        {/* <Button onPress={() => {setOrder(true)}}  style={{text}} title="Create Order">
        Create Order
      </Button> */}
      <Text style={{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  }}>Upto $400 rewards on every travel 
  Shop Products Internationally</Text>
      <Text>Special Offers</Text>
      <Carousel
        data={staticOffers}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={400}
        loop
        autoplay
        autoplayInterval={3000}
      />
      </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <CreateOrder setOrder={setOrder}/>
      {/* {!isOrder && (
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
      )} */}
{/* <Button onPress={() => {}} title="Add to order"> */}
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Coming Soon!</Text>
    </View>
  );
}


// console.log('createOrder', createOrder)
const Home = () => {
  return (<Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 11, fontWeight: 700 },
        tabBarStyle: { backgroundColor: "teal" }
      }}
    >
      <Tab.Screen name="Order" component={HomeScreen} />
      <Tab.Screen name="Travel" component={Travel} />
      <Tab.Screen name="Ship" component={ SettingsScreen } />
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
  button: {
    backgroundColor: 'teal',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    width: "100%",
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: "110%",
    height: "100%",
    borderRadius: 10,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: 'cover',
  },
  offerCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'teal',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  createButton: {
    margin: 10,
    padding: 10,
    backgroundColor: 'teal',
    borderRadius: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  }
});

export default Home;
