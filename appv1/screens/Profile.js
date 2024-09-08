import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigate } from '@storybook/addon-links/dist/preview';
import { Avatar, Title, Caption, Drawer, TouchableRipple, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withOAuth } from "aws-amplify-react-native";
import { useEffect } from 'react';
import { useState } from 'react';
import LoginScreen from './LoginScreen';
import { Navigation } from 'react-native-navigation';
import UpdateUser from './UpdateUser';
import Modal from 'react-native-modal';
import { Amplify, Auth, Hub } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { setLoginRoot } from '../index';

const goToProfileScreen = (props) => {
  console.log(props);
  // Navigation.push('1', {
  //   component: {
  //     name: 'frontendrn',
  //     options: {
  //       topBar: {
  //         title: {
  //           text: 'Settings',
  //         },
  //       },
  //     },
  //   },
  // });
  setLoginRoot();
};
  
Amplify.configure(awsconfig);
const UserProfileComponent = (props
  ) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // console.log(useAuth());
  const [updateUser, setIsUpdate] = useState(false);
  console.log(props);
  const {user, logout} = useAuth();
  const handleLogout = async () => {
    
    logout()
    // props.logout();
    await props.signOut();
    await goToProfileScreen(props);
    // props.navigation.navigate('Login/SignUp');
  }
  const [isModalVisible, setoMdalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
  useEffect(() => {
    // const {user} = useAuth();
  });
  return (
    
updateUser ? <UpdateUser setIsUpdate={setIsUpdate}/> :<View style={styles.container}>
<View style={styles.userInfoSection}>
      <Modal isVisible={isModalVisible}>
        <View>
          <Text>Hello! I am a modal!</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png', // Replace with the user's profile image URL
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
    <Title style={styles.title}>{firstName+' '+ lastName}</Title>
            <Caption style={styles.caption}>@johndoe</Caption>
          </View>
        </View>
      </View>

      <Drawer.Section style={styles.drawerSection}>
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="shield-account-outline" color={color} size={size} />
          )}
          label="Settings"
onPress={()=>setIsUpdate(true)}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="offer" color={color} size={size} />
          )}
          label="Coupons"
          onPress={() => {}}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="face-man" color={color} size={size} />
          )}
          label="Invite Friends"
          onPress={() => {}}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="chat-question-outline" color={color} size={size} />
          )}
          label="Support"
  onPress={handleLogout}
        />
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label="Logout"
  onPress={handleLogout}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16
  },
  userInfoSection:{
width: '100%',
  },
  drawerSection:{
    width: '100%',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make it circular
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default withOAuth(UserProfileComponent);
