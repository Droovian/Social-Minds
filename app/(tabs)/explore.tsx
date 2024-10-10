import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Explore() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='p-5'>
        <Text className='text-3xl font-bold text-center'>Join a community!</Text>
      </View>
    </SafeAreaView>
  );
}