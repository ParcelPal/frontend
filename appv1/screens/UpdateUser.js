import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Button, Text, View } from 'react-native';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { withOAuth } from "aws-amplify-react-native";
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

import { useAuth } from '../AuthProvider';
import { useEffect } from 'react';

const LoginSignUpScreen = (props) => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState(''); 
  const [newPassword, x] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmUser, setConfirmUser] = useState(false);
  const { login } = useAuth();
  const {
    oAuthUser,
    oAuthError,
    hostedUISignIn,
    facebookSignIn,
    googleSignIn,
    amazonSignIn,
    customProviderSignIn,
    signOut,
    navigation
  } = props;
     console.log(props);
     
  async function handleUpdate() {
    
    try{
      const user = await Auth.currentAuthenticatedUser();
      login(user);
      console.log(user);
      await Auth.updateUserAttributes(user, { 'custom:FirstName': firstName, 'custom:LastName': lastName});
  await Auth.changePassword(
        user, // The authenticated user
        oldPassword, // Old password
        newPassword // New password
      );
      props.setIsUpdate(false);
      navigation.navigate('ProfileScreen', {userData  });
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
    navigation.navigate('ProfileScreen', {user,signOut});
    console.log(user)
  } catch (error) {
    console.log('error signing in', error);
  }
}
}
const setAttributes = async ()=>{
  const user = await Auth.currentAuthenticatedUser();
  console.log(user);
  if(user){
    setFirstName(user.attributes['custom:FirstName']);
    setLastName(user.attributes['custom:LastName']);
    setUsername(user.attributes['username']);
    setEmail(user.attributes.email);
  }
}
useEffect(()=>{
setAttributes();
}
,[]);


async function handleSignUp() {
  
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        // other custom attributes 
      },
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    });
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
  source={null}
      style={styles.backgroundImage}
      resizeMode="cover" 
      position='relative'
    >
      <View style={styles.container}>
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
            Update User
        
        </Text>
          {/* <TextInput
          style={styles.input}
      placeholder="Email"
          onChangeText={(text) => setUsername(text)}
          value={username}
          keyboardType="email-address"
        /> */}
          <TextInput
          style={styles.input}
  placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
      value={firstName}
          keyboardType="default"
        />
          <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
      value={lastName}
          keyboardType="default"
    />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
          keyboardType="default"
        />
    <TextInput
          style={styles.input}
          placeholder="Old Password"
          onChangeText={(text) => setOldPassword(text)}
      value={oldPassword}
          secureTextEntry
        />
          
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={oldPassword}
            onChangeText={(text) => setNewPassword(text)}
value={newPassword}
            secureTextEntry
          />
        
        <TouchableOpacity
          style={styles.button}
  onPress={handleUpdate}
        >
          <Text style={styles.buttonText}>
      Update User
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button}
      onPress={()=>{props.setIsUpdate(false)}}
        >
          <Text style={styles.buttonText}>
      Back
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
backgroundColor: '#007BFF',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'transparent',
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
    color: 'white',
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
