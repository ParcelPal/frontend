import { Amplify, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useFocusEffect } from '@react-navigation/native';
import awsconfig from '../aws-exports';
import { Text } from 'react-native-paper';

Amplify.configure(awsconfig);

const AddTripForm = () => {
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(false);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [addTrips, setAddTrips] = useState(false);
  const [trips, setTrips] = useState([]);

  const handleAddTrip = async () => {
    // Validate form fields before adding the trip
    if (!from || !destination || !deliveryDate) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser();
      let trips = user.attributes['custom:trips'] ? JSON.parse(user.attributes['custom:trips']) : [];
      let userTrip = { from, destination, deliveryDate: date.toISOString(), notes };

      trips.push(userTrip);

      await Auth.updateUserAttributes(user, { 'custom:trips': JSON.stringify(trips) });

      // Update trips state
      setTrips(trips);

      // Clear form fields after adding the trip
      setFrom('');
      setDestination('');
      setDeliveryDate(false);
      setNotes('');
      setAddTrips(false);

      Alert.alert('Success', 'Trip added successfully!');
    } catch (error) {
      console.error('Error adding trip:', error);
      Alert.alert('Error', 'Failed to add trip. Please try again.');
    }
  };

  const loadAuthenticatedUser = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const trips = currentUser.attributes['custom:trips'] ? JSON.parse(currentUser.attributes['custom:trips']) : [];
      setTrips(trips);
    } catch (error) {
      console.error('Error loading authenticated user:', error);
      Alert.alert('Error', 'Failed to load user. Please check your connection and try again.');
    }
  };

  useEffect(() => {
    // Load the current authenticated user when the component mounts
    loadAuthenticatedUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadAuthenticatedUser();
      return () => {
        // Clean up if necessary
      };
    }, [])
  );

  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Text>From: {item.from}</Text>
      <Text>Destination: {item.destination}</Text>
      <Text>Delivery Date: {new Date(item.deliveryDate).toDateString()}</Text>
      <Text>Notes: {item.notes}</Text>
    </View>
  );

  return (
    !addTrips ? (
      <View style={styles.container}>
        <FlatList
          data={trips}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTripItem}
          style={styles.tripList}
        />
        <Text style={styles.text}>Head to the travel tab on home screen to pick up orders based on your destinations</Text>
        <Button title="Add Trip" onPress={() => setAddTrips(true)} />
          
      </View>
    ) : (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Travelling From"
          value={from}
          onChangeText={setFrom}
        />

        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />

        <Button title="Pick Travel Date" onPress={() => setOpen(true)} />
        <Text>
          {deliveryDate && ("Delivery Date : " + (date.getMinutes() === (new Date()).getMinutes() ? "select" : date.toISOString()))}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Additional Notes"
          multiline
          numberOfLines={3}
          value={notes}
          onChangeText={setNotes}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setDeliveryDate(true);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <Button title="Add Trip" onPress={handleAddTrip} />
        <Button title="Cancel" onPress={() => setAddTrips(false)} />
          
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  tripItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'lightgray',
    borderRadius: 4,
    borderWidth: 1,
  },
  tripList: {
    flex: 1,
    marginTop: 16,
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default AddTripForm;
