// OrdersList.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const OrdersList = ({ orders }) => {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Order ID: {item.orderId}</Text>
      <Text style={styles.orderText}>Destination: {item.destination}</Text>
      <Text style={styles.orderText}>Delivery Date: {item.deliveryDate}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default OrdersList;
