// OrdersList.js

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { useState } from 'react';
import ProductInfo from './ProductInfo';
import { useFocusEffect } from '@react-navigation/native';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { Button, Modal } from 'react-native-paper';
import { Tab } from 'react-native-elements';
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const OrdersList = ({ordersFiltered, fetchUpdate}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userSub, setUserSub] = useState('');
  const [orders, setOrders] = useState([]);
  const [isPlacingRequest, setIsPlacingRequest] = useState(false);
  const [pickedUpOrders, setPickedUp] = useState([]);
  const loadAuthenticatedUser = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const currentUserSub = currentUser.attributes?.['sub']; // Check if 'sub' is defined
      console.log(currentUserSub, userSub)
      if (currentUserSub !== userSub) {
        setUserSub(currentUserSub);
        setIsLoading(false);
      }
      else{
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading authenticated user:', error);
    }
  };
  const Tab = createMaterialTopTabNavigator();
useEffect(() => {
  if (ordersFiltered){
    // fetchUpdate();
    setOrders(ordersFiltered);
  }
  // else{
  //   setIsLoading(true);
    loadAuthenticatedUser();
  // }
})
  useEffect(() => {
    if (userSub) {
      fetchData();
      fetchPickedUpOrders();
    }
  }, [userSub]);

  useFocusEffect(
    React.useCallback(() => {
      if(!ordersFiltered){setIsLoading(true);
      loadAuthenticatedUser();}
    }, [])
  );
  const pickUpRequest = async (item) => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(item, user)
    // const {user, logout} = useAuth();
    const currentUser = user.attributes;
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "MTLEpOAep79Q3A3xOSXW78Y6xrUiuawQ1aiOV6kh");
    myHeaders.append("Content-Type", "application/json");
    item['traveler'] = currentUser['sub'];
    item['request_status'] = 'pickedup';
    item.price = JSON.stringify(item.price);
    item.rating = JSON.stringify(item.rating);

    let raw = JSON.stringify(item);
    console.log(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // productLoading(true); 
    setIsPlacingRequest(true);
    await fetch("https://lhudgv925k.execute-api.us-east-1.amazonaws.com/dev/pickuppackage-dev", requestOptions)
    await setIsPlacingRequest(false);
    useEffect(()=>{},[orders]);

  }
const fetchPickedUpOrders = async()=>{
  var myHeaders = new Headers();
      myHeaders.append("x-api-key", "MTLEpOAep79Q3A3xOSXW78Y6xrUiuawQ1aiOV6kh");
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "traveler": userSub,
        "sub": userSub,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      const response = await fetch("https://mtmv7ikssh.execute-api.us-east-1.amazonaws.com/dev/order/{proxy+}", requestOptions)
      const result = await response.json();
      console.log(result)
      setPickedUp(result);
}
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Image source={{ uri: item.product.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.product.title}</Text>
        <Text>Price in {item.product.currency} {item.product.price}</Text>
        <Text style={styles.rating}>Rating: {item.product.rating} stars</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle button press (e.g., navigate to the product page)
            // open web url 
            window.open(item.url, '_blank');
            console.log('Button pressed!');
          }}
        >
          <Text style={styles.buttonText}>View on Amazon</Text>
        </TouchableOpacity> */}
        <Text>Quantity: {item.quantity}</Text>
        <Text>Order Date: {item.orderDate}</Text>
        <Text>Delivery Date: {item.deliveryDate}</Text> 
        <Text>Order Status: {item.request_status}</Text> 
        <Text>Total Cost: {item.totalPrice}</Text>
        {ordersFiltered ? <Button onPress={()=>pickUpRequest(item)}>Pick up Order</Button> : <Button>Cancer Order</Button>}
        <Modal
          visible={isPlacingRequest}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setIsPlacingRequest(false);
          }}
        >
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      </View>
    </View>
  );

  const fetchData = async () => {
    try {
      if(!userSub){
      loadAuthenticatedUser();
console.log(userSub,"f")
      }
      console.log(orders, userSub, 'fe')
      var myHeaders = new Headers();
      myHeaders.append("x-api-key", "MTLEpOAep79Q3A3xOSXW78Y6xrUiuawQ1aiOV6kh");
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "sub": userSub
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      const response = await fetch("https://mtmv7ikssh.execute-api.us-east-1.amazonaws.com/dev/order/{proxy+}", requestOptions)
      const result = await response.json();
      setOrders(result);
      setIsLoading(false);
    
    } catch (error) {
      console.log(error);
      // Handle errors and set the error state
      // setError(error.message);
    } finally {
      // Set loading state to false when the fetch is complete
    }};
const OrdersPlaced = () => {
  console.log(orders)
  return (
    
    isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (<View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        horizontal={false}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={30}
        windowSize={10}
        removeClippedSubviews={false}
        ListEmptyComponent={<Text>No Orders Found</Text>}
        ListFooterComponent={<Text>Loading...</Text>}
        // ListHeaderComponent={<Text>Orders</Text>}
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
        ListHeaderComponentStyle={{ padding: 16 }}
        ListFooterComponentStyle={{ padding: 16 }}
        ListEmptyComponentStyle={{ padding: 16 }}
        data={orders? orders.filter((item)=>item.request_status == "requested"):null}
        keyExtractor={(item) => item.SNO}
        renderItem={renderOrderItem}
        />
    </View>
  ) );
}
const OrdersInTransit = () => {

  return isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (<View style={styles.container}>
    <FlatList
     refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
    }
    refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
    }
    style={styles.list}
    contentContainerStyle={styles.listContainer}
    horizontal={false}
    numColumns={1}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    initialNumToRender={10}
    maxToRenderPerBatch={10}
    updateCellsBatchingPeriod={30}
    windowSize={10}
    removeClippedSubviews={false}
    ListEmptyComponent={<Text>No Orders Found</Text>}
    ListFooterComponent={<Text>Loading...</Text>}
    // ListHeaderComponent={<Text>Orders</Text>}
    ItemSeparatorComponent={<View style={{ height: 10 }} />}
    ListHeaderComponentStyle={{ padding: 16 }}
    ListFooterComponentStyle={{ padding: 16 }}
    ListEmptyComponentStyle={{ padding: 16 }}
    data={orders.filter((item)=>item.request_status == "pickedup")}
    keyExtractor={(item) => item.SNO}
    renderItem={renderOrderItem}
/>
  </View>);
}
const OrdersPickedUp = () => {
  return isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (<View style={styles.container}>
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
      }
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      horizontal={false}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={30}
      windowSize={10}
      removeClippedSubviews={false}
      ListEmptyComponent={<Text>No Orders Found</Text>}
      ListFooterComponent={<Text>Loading...</Text>}
      // ListHeaderComponent={<Text>Orders</Text>}
      ItemSeparatorComponent={<View style={{ height: 10 }} />}
      ListHeaderComponentStyle={{ padding: 16 }}
      ListFooterComponentStyle={{ padding: 16 }}
      ListEmptyComponentStyle={{ padding: 16 }}
      data={pickedUpOrders}
      keyExtractor={(item) => item.SNO}
      renderItem={renderOrderItem}
/>
      </View>);
}
  return (
    ordersFiltered ? <OrdersPlaced /> : <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 11, fontWeight: 700 },
        tabBarStyle: { backgroundColor: "teal" }
      }}
    >
      <Tab.Screen name="Orders Placed" component={OrdersPlaced} />
      <Tab.Screen name="In Transit" component={OrdersInTransit} />
      <Tab.Screen name="Picked Up" component={ OrdersPickedUp } />
    </Tab.Navigator>)
  ;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  }, image: {
    width: 200,
    height: 200,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
  },
  list: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    height: "100%",
    width: "100%",
    borderColor: 'gray',
  }
});

export default OrdersList;
// export OrdersPlaced;