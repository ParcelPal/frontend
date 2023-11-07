import { useEffect } from "react";
import { View, FlatList, Text, Image, StyleSheet  } from "react-native";
import { Amplify, Auth, Hub } from 'aws-amplify';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import OrdersList from "./Orders";

export function Travel() {
    const [orders, setOrders] = useState([]);
    const [user, setUser]=  useState([]);
    const fetchOrders = async(cities, user_sub)=>{
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", "MTLEpOAep79Q3A3xOSXW78Y6xrUiuawQ1aiOV6kh");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "sub": user_sub,
        "travel": cities
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log(requestOptions);
        await fetch("https://mtmv7ikssh.execute-api.us-east-1.amazonaws.com/dev/order/{proxy+}", requestOptions)
        .then(response => response.text())
        .then(result => setOrders(JSON.parse(result)))
        .catch(error => console.log('error', error));
    }
    useFocusEffect(()=>{
    //   const trips = JSON.parse(user.attributes['custom:trips']);
    //   const user_sub = user.attributes['sub'];
    //   console.log(trips);
    //   const cities = trips.map(trip => trip['destination']);
    //   console.log(cities);
    // fetchOrders(cities, user_sub);
});
const userLoad = async ()=>{
    const userData = await Auth.currentAuthenticatedUser();
    setUser(userData);
    console.log(userData);
    const trips = JSON.parse(userData.attributes['custom:trips']);
  const user_sub = userData.attributes['sub'];
  console.log(trips);
  const cities = trips.map(trip => trip['destination']);
  console.log(cities);
fetchOrders(cities, user_sub);
}
useEffect(()=>{
    userLoad();
    if(user.attributes){
      
    }
},[])

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%"  ,backgroundColor: "#fff",  
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}> 
        <Text style={styles.text}>Orders based on your Travel Itineraries ready to Pick up!</Text>
        <OrdersList ordersFiltered={orders} fetchUpdate={userLoad}/>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 8,
        marginTop: 8,
        textAlign: "center"

    },
    }
);
