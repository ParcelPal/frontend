// AddTripForm.js
import { Amplify, Auth, Hub } from 'aws-amplify';

import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { useFocusEffect } from '@react-navigation/native';

import { Text } from 'react-native-paper';

const AddTripForm = () => {
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(false);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [addTrips, setAddTrips] = useState(false)
  const [trips, setTrips] = useState([])
  // const user = async()=>await Auth.currentAuthenticatedUser();

  const handleAddTrip = async (trip) => {
    // Validate form fields before adding the trip
    if (!destination || !deliveryDate) {
      // Display an error or alert for incomplete form
      Alert('Please input all fields')
      return;
    }
    
    let trips = [];
    
    let userTrip = {from: from, destination: destination, deliveryDate: date, notes: notes};
    const user = await Auth.currentAuthenticatedUser();
    if('custom:trips' in user.attributes){
      trips = JSON.parse(user.attributes['custom:trips']);
      trips.push(userTrip);
    }
    else{
      trips = [userTrip];
    }
    await Auth.updateUserAttributes(user, { 'custom:trips':  JSON.stringify(trips)});

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
  const fetchTrips = async () => {
    const user = await Auth.currentAuthenticatedUser();
    let trips_user = JSON.parse(user.attributes['custom:trips']);
    setTrips(trips_user);
  }
  useEffect(() => {
    // Load the current authenticated user when the component mounts
    loadAuthenticatedUser();
  }, []);
  const loadAuthenticatedUser = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setTrips(JSON.parse(currentUser.attributes['custom:trips']));
      console.log(currentUser);
    } catch (error) {
      console.error('Error loading authenticated user:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Simulate an asynchronous operation (e.g., API call) with setTimeout
      // fetchTrips();
      // console.log(user);
      console.log(trips);
    loadAuthenticatedUser();

      setAddTrips(false);
      // if(user){
      //   setAddTrips(true);
      // }
      // setTrips(JSON.parse(user.attributes?user.attributes['custom:trips']:null));
      return () => {
        // Clean up or perform actions when leaving Screen A
      };
    }, [])
  );

  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Text>From: {item.from}</Text>
      <Text>Destination: {item.destination}</Text>
      <Text>Delivery Date: {item.deliveryDate}</Text>
      <Text>Notes: {item.notes}</Text>
    </View>
  );
  const setAddTripsToggle = () => {
    setAddTrips(true);
  }
  return (
    !addTrips ? <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTripItem}
        style={styles.tripList}
      />
      <Button title="Add Trip" onPress={setAddTripsToggle}/>
    </View>:
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Travelling From"
        value={from}
        onChangeText={(text) => setFrom(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />

      <Button title="Pick Travel Date" onPress={() => setOpen(true)} />
      <Text >{setDeliveryDate && ("Delivery Date : " + date.getMinutes() == (new Date()).getMinutes() ? "select" :date.toISOString())}</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Travel Date"
        value={deliveryDate}
        onChangeText={(text) => setDeliveryDate(text)}
      /> */}

      <TextInput
        style={styles.input}
        placeholder="Additional Notes"
        multiline
        numberOfLines={3}
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />
      <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            console.log(date)
            setDeliveryDate(true)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />

      <Button title="Add Trip" onPress={handleAddTrip} />
      <Button title="Cancel" onPress={() => setAddTrips(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    marginBottom: 16,
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  }
});

export default AddTripForm;
