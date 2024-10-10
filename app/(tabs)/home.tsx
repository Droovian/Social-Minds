import { ScrollView, StyleSheet, Text, View, Pressable, Alert, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { router } from 'expo-router'
import { useState } from 'react'
import { useGlobalContext } from '../context/app-provider'
import UserCard from '@/components/UserCard'
import { logout } from '@/lib/appwrite'
import Cards from '@/components/Cards'
const Home = () => {

  const { user, setUser, isLogged, setIsLogged } = useGlobalContext()!;

  const handleLogout = async () => {
    try{
      await logout();
      setUser(null);
      setIsLogged(false);

      router.replace('/sign-in');
    }
    catch(err){
      Alert.alert('Error', 'An Unexpected Error Occured!');
    }
  }
  
  
  // console.log('userrrrrr', user);
  return (
    <SafeAreaView style={styles.parentContainer}>
        <UserCard userData= {user}/>
        <ScrollView>
            <Text style={styles.primaryText}>
              What would you like to proceed with?
            </Text>
            
            <Cards/>

        </ScrollView>

        
    {
      isLogged && 
        <View style={styles.homeFooter}>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={{color: 'white'}}>Logout</Text>
            </Pressable>
        </View>
    }
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({

  parentContainer:{
    backgroundColor: 'white',
    flex: 1,
  },
  primaryText:{
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  logoutButton: {
    backgroundColor: '#000000',
    width: '20%',
    paddingVertical: 15, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1, 
    textTransform: 'uppercase',
  },

  homeFooter:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 10
  }, 
    fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:50
  },
  button1:{
    color:"EB8317",
  }
  
 
})