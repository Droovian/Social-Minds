import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
const Add = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='p-5'>
        <Text className='text-3xl font-bold text-center'>Add an Event</Text>
      </View>
    </SafeAreaView>
  )
}

export default Add

const styles = StyleSheet.create({})