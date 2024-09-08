import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import firestore from '@react-native-firebase/firestore';

const COGNITO_API_URL = 'https://pxyh873e39.execute-api.us-east-1.amazonaws.com/default/listusers';
const API_KEY = 'Qy6PkYbHXE3qb0Qhz8yvt97okzenPd6e5rjffwzw';

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch current user from AWS Amplify Auth
    Auth.currentAuthenticatedUser()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.error('Error fetching current user:', err);
      });

    // Fetch users from the API
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search query
    const query = searchQuery.toLowerCase();
    setFilteredUsers(users.filter(user =>
      (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).includes(query) ||
      user.email.toLowerCase().includes(query)
    ));
  }, [searchQuery, users]);

  useEffect(() => {
    if (selectedUser && currentUser) {
      const chatId = [currentUser.attributes.sub, selectedUser.id].sort().join('_');

      // Listen for new messages in real-time
      const unsubscribe = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {
          const messagesList = [];
          querySnapshot.forEach((doc) => {
            messagesList.push({ id: doc.id, ...doc.data() });
          });
          setMessages(messagesList);
        }, (error) => {
          console.error('Error fetching messages:', error);
        });

      // Clean up the listener on unmount
      return () => unsubscribe();
    }
  }, [selectedUser, currentUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(COGNITO_API_URL, {
        headers: {
          'x-api-key': API_KEY,
        },
      });

      const usersList = response.data.map(user => {
        const emailAttr = user.Attributes.find(attr => attr.Name === 'email');
        const firstNameAttr = user.Attributes.find(attr => attr.Name === 'custom:FirstName');
        const lastNameAttr = user.Attributes.find(attr => attr.Name === 'custom:LastName');
        return {
          id: user.Username,
          email: emailAttr?.Value || 'No email',
          firstName: firstNameAttr?.Value || 'No first name',
          lastName: lastNameAttr?.Value || 'No last name',
        };
      });

      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  const sendMessage = async () => {
    if (newMessage.trim().length > 0 && selectedUser && currentUser) {
      try {
        const chatId = [currentUser.attributes.sub, selectedUser.id].sort().join('_');
        await firestore()
          .collection('chats')
          .doc(chatId)
          .collection('messages')
          .add({
            text: newMessage,
            createdAt: firestore.FieldValue.serverTimestamp(),
            senderId: currentUser.attributes.sub,
            receiverId: selectedUser.id,
          });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (!showChat) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
          Users
        </Text>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleUserPress(item)}
              style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
            >
              <Text style={{ fontSize: 16 }}>{item.firstName} {item.lastName} ({item.email})</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, marginBottom: 100 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.senderId === currentUser.attributes.sub ? styles.sent : styles.received,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
      <Button title="Back to Users" onPress={() => setShowChat(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    maxWidth: '80%',
  },
  sent: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  received: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatApp;
