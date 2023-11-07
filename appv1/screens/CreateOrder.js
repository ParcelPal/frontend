import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator , TouchableOpacity, Text} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

import { useFocusEffect } from '@react-navigation/native';
import Base64 from './Base64';
import ProductInfo from './ProductInfo';
const CreateOrder = ({setOrder}) => {
  const [url, setUrl] = useState('https://www.amazon.com');
  const webViewRef = React.useRef(null);
  const [isFetcing, setIsFetching]  = useState(true);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Simulate an asynchronous operation (e.g., API call) with setTimeout
      setIsLoading(true);
      const fetchData = async () => {
        try {
          // Simulate an API call with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 2000));
          // Perform actions when Screen A is focused
        } catch (error) {
          // Handle errors
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();

      return () => {
        // Clean up or perform actions when leaving Screen A
      };
    }, [])
  );
  const handleNavigationStateChange = (navState) => {
    // Log or perform actions based on the navigation state
    if (navState.loading) {
      setUrl(navState.url);
    }
      console.log('Current URL:', navState.url);
    console.log('Navigation Type:', navState.navigationType);
  };
  const scrapeUrl = async(url) => {
    
    console.log(url)
    const username = 'anirudhp1';
    const password = 'password1!!P';

    const body = {
      'source': 'amazon',
      'url': url,
      'parse': true
    };

    const authHeader = 'Basic ' + Base64.btoa(`${username}:${password}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    };

    try {
      setProductLoading(true);
      setIsFetching(false);
      const response = await axios.post('https://realtime.oxylabs.io/v1/queries', body, {
        headers,
      });

      // Handle the response as needed     
      await setProductData(response.data);
      await setIsLoading(false);
      await setProductLoading(false);
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
    }
    console.log(await response.json());
  }
  const loadUrl = () => {
    if(!webViewRef.current){

    }
    webViewRef.current && webViewRef.current.reload();
  };

  return (
    isFetcing ? (isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <View style={styles.container}>
       <View style={styles.urlContainer}>
        <TextInput
          style={styles.urlInput}
          value={url}
          placeholder='Type the product url or browse to product'
          onChangeText={(text) => setUrl(text)}
        />
        <Button title="Go" onPress={loadUrl} />
      </View>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webView}
        onNavigationStateChange={handleNavigationStateChange}
      />
      <TouchableOpacity
          style={styles.button}
          onPress={ () => {scrapeUrl(url)}}
        >
          <Text style={styles.buttonText}>
            { 'Add current product to Order'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={ ()=>  setOrder(false)}
        >
          <Text style={styles.buttonText}>
            { 'Cancel'}
          </Text>
        </TouchableOpacity>
      {/* <Button style={styles.button} onPress={() => {scrapeUrl(url)}} labelStyle={styles.buttonText} title="Add to order"></Button> 
      <Button onPress={() => {setOrder(false)}} title="Go Back"></Button> */}
    </View>): productLoading ? <ActivityIndicator size="large" color="#0000ff" text="Product Loading "/> : <ProductInfo goToHome={setOrder} data={productData} setFetching={()=>setIsFetching} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
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
    marginLeft: '5%',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  urlContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  urlInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingLeft: 8,
  },
  webView: {
    flex: 1,
    
  },
  
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CreateOrder;
