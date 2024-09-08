import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

// API endpoint and key
const COGNITO_API_URL = 'https://pxyh873e39.execute-api.us-east-1.amazonaws.com/default/listusers';
const API_KEY = 'Qy6PkYbHXE3qb0Qhz8yvt97okzenPd6e5rjffwzw';

// Function to sync Cognito users with Firebase Firestore
const syncUsers = async () => {
  try {
    // Fetch users from Cognito
    const response = await axios.get(COGNITO_API_URL, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    
    const users = response.data; // Adjust this if the structure is different

    // Update Firestore with the fetched users
    const batch = firestore().batch();

    users.forEach(user => {
      const userRef = firestore().collection('users').doc(user.Username);
      batch.set(userRef, {
        id: user.Username,
        email: user.Attributes?.find(attr => attr.Name === 'email')?.Value || 'No email',
        // Add any other attributes you need to sync
      }, { merge: true });
    });

    await batch.commit();
    console.log('Users synced successfully!');
  } catch (error) {
    console.error('Error syncing users:', error);
  }
};

export default syncUsers;
