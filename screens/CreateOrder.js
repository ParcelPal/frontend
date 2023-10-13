import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const CreateOrder = () => {
  const [url, setUrl] = useState('https://www.example.com');
  const webViewRef = React.useRef(null);
  const handleNavigationStateChange = (navState) => {
    // Log or perform actions based on the navigation state
setUrl(navState.url)
    console.log('Current URL:', navState.url);
    console.log('Navigation Type:', navState.navigationType);
  };
  const loadUrl = () => {
    webViewRef.current && webViewRef.current.reload();
  };

  return (
    <View style={styles.container}>
      <View style={styles.urlContainer}>
        <TextInput
          style={styles.urlInput}
          value={url}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
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
});

export default CreateOrder;
