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
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(props.route ? props.route.params ? props.route.params.update:false:false);
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
  useEffect(()=>{
    handleLogin();
    console.log('useeffect')
  
  console.log(props)
    },[]);
  
  async function handleLogin() {
    
    try{
      const userData = await Auth.currentAuthenticatedUser();
      login(userData);
  
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
    
    navigation.navigate('ProfileScreen');
    console.log(user)
  } catch (error) {
    console.log('error signing in', error);
  }
}
}


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
          {isSignUp ? 'Create Account' : 'Welcome to AirCargo'}
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
          onPress={() => setIsSignUp(!isSignUp)}
        >
          <Text style={styles.toggleText}>
            {isSignUp
              ? 'Already have an account? Log In'
              : 'Don’t have an account? Sign Up'}
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
backgroundColor: 'blue',
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
    color: 'white',
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
