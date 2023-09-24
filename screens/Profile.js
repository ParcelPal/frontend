import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAuth } from '../AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const UserProfileComponent = () => {
    const { user, logout } = useAuth();
    console.log(user);
    return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: user.profilePicture }} // Replace with the user's profile picture URL
        style={styles.profilePicture}
      /> */}
      <Text style={styles.username}>{user.attributes.email}</Text>
      <Text style={styles.bio}>{}</Text>
      {/* Add more user information components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
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

export default UserProfileComponent;
