import React, { useState } from 'react';
import {
TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator
} from 'react-native';

import { Button, Text, View } from 'react-native';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { withOAuth } from "aws-amplify-react-native";
import awsconfig from '../aws-exports';
import { Storage } from 'aws-amplify';
import { setProfileRoot } from '../index';
const uploadToS3 = async (imageUri, key) => {
  try {
    const response = await Storage.put(key, imageUri, {
      level: 'public',
      contentType: 'image/jpeg', // Adjust content type based on your use case
    });
    console.log('S3 Upload Response:', response);
    return response.key; // Return the key for future references if needed
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw error;
  }
};

Amplify.configure(awsconfig);
import ImagePicker from 'react-native-image-picker';

import { useAuth } from '../AuthProvider';
import { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import { Image } from 'react-native-elements';
const LoginSignUpScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(props.route ? props.route.params ? props.route.params.update:false:false);
  const [confirmUser, setConfirmUser] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [image, setImage] = useState(null);



const {
  oAuthUser,
  oAuthError,
  hostedUISignIn,
  facebookSignIn,
  googleSignIn,
  amazonSignIn,
  customProviderSignIn,
  signOut
} = props;
console.log(props);
useEffect(()=>{
  handleLogin();
  console.log('useeffect')
  setIsLoading(false);
  
  console.log(props)
},[]);
const goToProfileScreen = (screen) => {
  // Navigation.push('1', {
  //   component: {
  //     name: 'ProfileScreen',
  //     options: {
  //       topBar: {
  //         visible: false,
  //         drawBehind: false,
  //         title: {
  //           text: "Profile",
  //           color: "#121"
  //         }
  //       }}
  //     },
  //   });
  console.log('profile root')
  setProfileRoot();

  };
  
  async function handleLogin() {
    
    try{
      setIsLoading(true);
      const userData = await Auth.currentAuthenticatedUser();
      console.log(userData)
      login(userData);
      goToProfileScreen();
    }
    catch(error){
      console.log(error)
    }
    if(confirmUser){
      confirmSignUp();
    }
    else{
      console.log('here')
      try {
        const user = await Auth.signIn(username, password);
        login(user);
        goToProfileScreen();
        console.log(user)
      } 
      catch (error) {
        console.log('error signing in', error);
      }
    }
  }
  
  const pickImage = async () => {ImagePicker.showImagePicker({ mediaType: 'photo' }, async (response) => {
    if (!response.didCancel) {
      try {
        const s3Key = await uploadToS3(response.uri, 'unique-key-for-image.jpg');
        console.log('Image uploaded to S3 with key:', s3Key);
        // Additional logic or state update based on your use case
      } catch (error) {
        console.error('Error uploading image to S3:', error);
      }
    }
  });}
  
  async function handleSignUp() {
    
    try {
      const { user } = await Auth.signUp({
        username,
        password,
      attributes: {
        // other custom attributes 
        'custom:FirstName': firstName,
        'custom:LastName': lastName,
      },
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    });
    confirmSignUp()
    setConfirmUser(true);
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }
}
async function confirmSignUp() {
  try {
   const {user} = await Auth.confirmSignUp(username, password);
    console.log(user)
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

  return (
    <ImageBackground
  source={require('./2018477.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover" 
      position='relative'
    >

      <View style={styles.container}>
      {isloading && <ActivityIndicator size="large" color="#0000ff" />}
      {/* <Text>User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : 'None'}</Text>
      {oAuthUser ? (
        <Button title="Sign Out" onPress={signOut} />
      ) : (
      <>*/}
          {/* Go to the Cognito Hosted UI */}
          {/* <Button title="Cognito" onPress={hostedUISignIn} /> */}

          {/* Go directly to a configured identity provider */}
          {/* <Button title="Facebook" onPress={facebookSignIn} />
          <Button title="Google" onPress={googleSignIn}  />
          <Button title="Amazon" onPress={amazonSignIn} /> */}

          {/* e.g. for OIDC providers */}
          {/* <Button title="Yahoo" onPress={() => customProviderSignIn('Yahoo')} />
        </>
      )}  */}
        <Text style={styles.headerText}>
          {isSignUp ? 'Create Account' : 'AirMeeds'}
        </Text>
        {isSignUp && (<TextInput
          style={styles.input}
      placeholder="Email"
          onChangeText={(text) => setEmail(text)}
      value={email}
          keyboardType="email-address"
        />)}
        {isSignUp && (<TextInput
          style={styles.input}
  placeholder="First Name"
      onChangeText={(text) => setFirstName(text)}
  value={firstName}
          keyboardType="default"
        />)}
        {isSignUp && (<TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
  value={lastName}
          keyboardType="default"
    />)}
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
          keyboardType="default"
        />
        {isSignUp && image && <Image source={image} style={{ width: 200, height: 200 }} />}
        {isSignUp && <Button title="Upload an Image" onPress={pickImage} />}
    <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={isSignUp ? handleSignUp : handleLogin}
        >
          <Text style={styles.buttonText}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsSignUp(!isSignUp)}
        >
          <Text style={styles.buttonText}>
            {isSignUp
              ? 'Already have an account? Log In'
              : 'Sign Up ?'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
},
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'aquamarine',
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
  toggleText: {
    marginTop: 20,
    color: 'grey',
    textDecorationLine: 'underline',
  },
});

export default withOAuth(LoginSignUpScreen);
