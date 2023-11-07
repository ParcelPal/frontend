import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import  MyTabs from './NavigationBottom';
import { useAuth } from '../AuthProvider';
import { NavigationContainer } from '@react-navigation/native';

const MainApp = (props) => {
  // Dummy user data (replace with actual data)
  // const user = {
  //   name: 'John Doe',
  //   bio: 'Web Developer | Explorer | Coffee Lover',
  //   profilePicture: 'https://example.com/profile.jpg', // URL to the user's profile picture
  // };
  // const { user, logout } = useAuth();
console.log(props)
// console.log(user, "profile", user.attributes);

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    marginBottom: 0
  },
};
  return (
    <NavigationContainer  style={styles.container} headerShown={false}
    screenOptions={{
      headerShown: false
    }}    theme={MyTheme}><MyTabs />
    </NavigationContainer>)
  //   <View style={styles.container}>
  //     {/* Profile Picture */}
  //     <Image
  //       source={{ uri: user.profilePicture }}
  //       style={styles.profilePicture}
  //     />

  //     {/* User Name */}
  // <Text style={styles.userName}>user {user.route.params.user.attributes.email}</Text>

  //     {/* User Bio */}
  //     <Text style={styles.userBio}>{}</Text>

  //     {/* Edit Profile Button */}
  //     <TouchableOpacity style={styles.editProfileButton}>
  //       <Text style={styles.editProfileButtonText}>Edit Profile</Text>
  //     </TouchableOpacity>
  //   </View>
  // 

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userBio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainApp;
