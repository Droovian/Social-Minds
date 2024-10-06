import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const UserCard = ({ userData }: any) => {
    console.log(userData);
    
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Welcome to Social Minds!</Text>
      <Text style={styles.usernameText}>{userData?.username || 'User'}</Text>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ADD8E6',
    padding: 25,
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    height: 200,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
    fontWeight: '400',
  },
  usernameText: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
  },
});
