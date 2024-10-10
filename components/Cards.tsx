import icons from "@/constants/icons";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const Cards = ()=> {
    
    return (
    <>
         <View style={styles.buttonGrid}>
         <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#f15a9b' }]}>
        <Pressable style={styles.button} onPress={() => Alert.alert('Clicked Gameplay')}>
          <Entypo name="game-controller" size={24} color="black" style={styles.icon} />
          <Text style={styles.gridText}>Games</Text>
        </Pressable>
      </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#9b91f1' }]}>
        <Pressable style={styles.button} onPress={() => Alert.alert('Clicked Challenges')}>
            <FontAwesome5 name="mountain" size={24} color="black" />
          <Text style={styles.gridText}>Challenges</Text>
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#91f1e7' }]}>
        <Pressable style={styles.button} onPress={() => Alert.alert('Clicked Community')}>
        <FontAwesome6 name="people-group" size={24} color="black" />
          <Text style={styles.gridText}>Community</Text>          
        </Pressable>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#f1a55a' }]}>
        <Pressable style={styles.button} onPress={() => Alert.alert('Clicked Goals')}>
        <Feather name="target" size={24} color="black" />
          <Text style={styles.gridText}>Goals</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
        
    
    </>
    );
};

export default Cards;


const styles = StyleSheet.create({
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
    gridItem: {
        width: '48%',
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,

      },
      gridText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
      },
      button: {
        padding: 20,
        borderRadius: 10,
      },
      icon: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }
})