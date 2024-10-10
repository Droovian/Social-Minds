import { ScrollView, StyleSheet, Text, View, Pressable, Alert, Modal } from 'react-native'
import { Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { router } from 'expo-router'
import { updateUserProfile } from '@/lib/appwrite'
import { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/app-provider'
import UserCard from '@/components/UserCard'
import { logout } from '@/lib/appwrite'
import CustomButton from '@/components/Button'
const Home = () => {

  const { user, setUser, isLogged, setIsLogged } = useGlobalContext()!;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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

  const interests = [
    "Technology",
    "Science",
    "Art",
    "Music",
    "Sports",
    "Travel",
    "Food",
    "Fashion",
  ];
  
  useEffect(() => {
    if (user && !user.hasSelectedInterest) {
      setModalVisible(true); 
    }
  }, [user]);

  const handleInterestsSelectionDone = async () => {
    try {
      await updateUserProfile({
        hasSelectedInterest: true,
        interests: selectedOptions,
      });

      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Could not update interests.');
    }
  };
  

  const toggleInterest = (interest: string) => {
    if (selectedOptions.includes(interest)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== interest));
    } else {
      if (selectedOptions.length < 4) {
        setSelectedOptions([...selectedOptions, interest]);
      } else {
        Alert.alert("Limit Reached", "You can only select up to 4 interests.");
      }
    }
  };

  return (
    <SafeAreaView className='bg-white flex-1'>
        <UserCard userData= {user}/>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <SafeAreaView className='bg-white flex-1 justify-center'>
          <View className='mx-10 p-4'>
            <Text className='text-2xl font-bold mb-4 text-center'>Select Your Interests upto 4</Text>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
              {interests.map((interest) => (
                <Pressable
                  key={interest}
                  className={`w-1/2 px-3 justify-center items-center py-1 mb-3 rounded-lg text-center ${selectedOptions.includes(interest) ? 'bg-gray-500' : 'bg-gray-200'} shadow-lg`}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text className='text-lg text-black'>{interest}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              className='bg-black rounded-lg py-2 mt-4'
              onPress={handleInterestsSelectionDone}
            >
              <Text className='text-white font-bold text-center'>Done</Text>
            </Pressable>
            </View>
        </SafeAreaView>
      </Modal>
        <ScrollView>
            <Text style={styles.primaryText}>
              What would you like to proceed with?
            </Text>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  homeFooter:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
 
})