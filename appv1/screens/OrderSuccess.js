import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const OrderSuccess = ({goToProducts, goToHome, productData}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOrderSuccess, setOrderSuccess] = useState(false);
  console.log(productData);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOrderSuccess = () => {
    // Perform logic for order success
    setOrderSuccess(true);
    toggleModal(); // Show the modal
  };

  return (
    <View style={styles.container}>
      <Text>Your component content goes here.</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <>
                <Text>Order Placed Successfully! for {productData.title}</Text>
                <TouchableOpacity style={styles.products} onPress={goToProducts(true)}>
                  <Text>Go to Products</Text>
                </TouchableOpacity>
              </>
              <>
                {/* <Text>Order Placed for </Text> 
                <TouchableOpacity onPress={toggleModal}>
                  <Text>Close Modal</Text>
                </TouchableOpacity>*/}
              </>
              
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  products: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  }
});

export default OrderSuccess;
