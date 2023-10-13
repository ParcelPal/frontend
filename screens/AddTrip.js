// AddTripForm.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddTripForm = ( ) => {
  const [destination, setDestination] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddTrip = () => {
    // Validate form fields before adding the trip
    if (!destination || !deliveryDate) {
      // Display an error or alert for incomplete form
      return;
    }

    // Create a new trip object
    const newTrip = {
      destination,
      deliveryDate,
      notes,
    };

    // Pass the new trip to the parent component or function
    // onAddTrip(newTrip);

    // Clear form fields after adding the trip
    setDestination('');
    setDeliveryDate('');
    setNotes('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Delivery Date"
        value={deliveryDate}
        onChangeText={(text) => setDeliveryDate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Additional Notes"
        multiline
        numberOfLines={3}
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />

      <Button title="Add Trip" onPress={handleAddTrip} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AddTripForm;
