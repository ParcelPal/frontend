import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Sample data for notifications
const notificationsData = [
  {
    id: '1',
    message: 'New message from John Doe',
  },
  {
    id: '2',
    message: 'You have 3 new emails',
  },
  {
    id: '3',
    message: 'Reminder: Meeting at 2 PM',
  },
  // Add more notifications as needed
];

const NotificationsComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notification: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default NotificationsComponent;
