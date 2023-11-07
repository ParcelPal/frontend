import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../AuthProvider';

import DropDownPicker from 'react-native-dropdown-picker';

import { Slider,  Icon } from '@rneui/themed';

import { Button, TextInput } from 'react-native-paper';
// import { Slider } from 'react-native-elements';
import axios from 'axios';
import { withOAuth } from "aws-amplify-react-native";
import awsconfig from '../aws-exports';
import { Amplify, Auth, Hub } from 'aws-amplify';
import OrderSuccess from './OrderSuccess';

Amplify.configure(awsconfig);

const ProductInfo = (props) => {
  const {goToHome, data, setFetching} = props;
  console.log(data)
  const [productData, setProductData] = useState(data?data.results.content:null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [travelerComm, setEditablePrice] = useState(0.10);
  const [isPlacingRequest, setIsPlacingRequest] = useState(false);
  const [isOrderSuccess, setisOrderSuccess] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const user = async()=>await Auth.currentAuthenticatedUser();
console.log(user)   
  useEffect( () => { 
    if(data){
        let newdata = data.results[0].content;
        newdata = {'title': newdata.title, 'image': newdata.images[0], 'price': newdata.price, 'currency': newdata.currency, 'rating': newdata.rating, 'description': newdata.description}
        setProductData(newdata); 
    }
    console.log(data, productData, 'ef')
}, [data]);
  const placeOrderRequest = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user)
    // const {user, logout} = useAuth();
    const currentUser = user.attributes;
    var myHeaders = new Headers();
myHeaders.append("x-api-key", "MTLEpOAep79Q3A3xOSXW78Y6xrUiuawQ1aiOV6kh");
myHeaders.append("Content-Type", "application/json");
let totalPrice = (productData.price + productData.price*travelerComm*0.01 + productData.price*0.1).toFixed(2)
// const totalValue = new AttributeValue();
// const productPrice = new AttributeValue();
// productPrice.N = productData.price;
productData.price = JSON.stringify(productData.price);
productData.rating = JSON.stringify(productData.rating);
const orderId = parseInt(Math.random()*1000);
let raw = JSON.stringify({
    "SNO": orderId,
    "orders": currentUser['sub']+"_"+orderId,
    "product": productData,
    "requesterName": currentUser['custom:FirstName'] + " " + currentUser['custom:LastName'],
    "totalPrice": totalPrice,
    "requesterAddress": "123 Main St",
    "requester_sub": currentUser['sub'],
    "traveler": "ready",
    "packageSize": "Medium",
    "email": currentUser['email'],
    "request_status": "requested",
    "city": city,
    "address": address,
    });
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
await setisOrderSuccess(true);
// .then(response => response.text())
  // .then(result=>{console.log(result); productLoading(false);}
// )
//   .catch(error => console.log('error', error));
//     let data = JSON.stringify({
//     "SNO": "12345",
//     "orders": productData,
//     "requesterName": currentUser['custom:FirstName'] + " " + currentUser['custom:LastName'],
//     "requesterAddress": "123 Main St",
//     "requester_sub": currentUser['sub'],
//     "traveler": "",
//     "packageSize": "Medium"
//     });

//     let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://lhudgv925k.execute-api.us-east-1.amazonaws.com/dev/pickuppackage-dev',
//     headers: { 
//         'x-api-key': 'MTLEpOAep79Q3A3xOSXW78Y6xrUiuawQ1aiOV6kh', 
//         'Content-Type': 'application/json'
//     },
//     data : data
//     };

//     axios.request(config)
//     .then((response) => {
//     console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//     console.log(error);
//     });
  }
  return (
    isOrderSuccess ? <OrderSuccess productData={productData} goToProducts={setFetching} goToHome={goToHome}/> :
    productData ? isPlacingRequest ? <ActivityIndicator size="large" color="#0000ff" text="Product Loading "/> : <View style={styles.container}>
      <Image source={{ uri: productData.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{productData.title}</Text>
        <Text>Price in {productData.currency}</Text>
        <Text style={styles.price}>{productData.price}</Text>
        <TextInput style={styles.city} onChangeText={setCity} placeholder="Type Your City Where You want it delivered..." required/>
        <TextInput style={styles.address} onChangeText={setAddress} placeholder="Address(optional)" />
        <Text style={styles.rating}>Rating: {productData.rating} stars</Text>
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        /> */}
        {/* <Text style={styles.description}>{productData.description}</Text> */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle button press (e.g., navigate to the product page)
            // open web url 
            window.open(productData.url, '_blank');
            console.log('Button pressed!');
          }}
        >
          <Text style={styles.buttonText}>View on Amazon</Text>
        </TouchableOpacity> */}
        <Text>ParcelPal Fee: 10% {productData.price*0.1}</Text>
        <Text>Max Traveler Commission : {travelerComm }%</Text>
        <Slider
        value={travelerComm}
        onValueChange={(value) => setEditablePrice(value)}
        maximumValue={50}
        minimumValue={10}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
        thumbProps={{
          children: (
            <Icon
              name="money"
              type="font-awesome"
              size={20}
              reverse
              containerStyle={{ bottom: 20, right: 20 }}
              color={"#000"}
            />
          ),
        }}
      />{/*
        <Slider
            minimumValue={10}
            maximumValue={50}
            step={1}
            value={travelerComm}
            onValueChange={(value) => setEditablePrice(value)}
            thumbProps={{
              children: (
                <Icon
                  name="money"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color="#000"
                />
              ),
            }}
          />*/}
        <Text>Total Cost: {(productData.price + productData.price*travelerComm*0.01 + productData.price*0.1)}</Text>
      </View>
      <TouchableOpacity style={ styles.placeorder }onPress={placeOrderRequest}>
        <Text>Place Order Request</Text>
      </TouchableOpacity>
      {/* <Button onPress={placeOrderRequest}>Request Order</Button> */}
      <Button onPress={setFetching(false)}> Go Back</Button>
    </View>:<Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  city: {
    fontSize: 14,
    color: 'green',
    height: 45
  },
  address: {
    fontSize: 14,
    color: 'green',
    height: 45
  },
  rating: {
    fontSize: 14,
    color: 'orange',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  slider: {
    width: 200,
    marginVertical: 10,
    backgroundColor: 'white',
    tintColor: 'black'
  },
  placeorder:{
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    
  }
});

export default ProductInfo;
