import { Link, router, Redirect } from 'expo-router';
import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from './context/app-provider';

export default function HomeScreen() {

  const { loading, isLogged } = useGlobalContext()!;

  if(isLogged) return <Redirect href='/home' />
  
  return (
    <SafeAreaView className='h-full bg-cyan-100 flex justify-center items-center'>
      <View className='bg-white h-1/2 w-4/5 rounded-lg shadow-lg flex items-center'>
        <Text className='mt-7 text-center text-3xl font-semibold p-4'>Social Minds</Text>
        <Text className='mt-4 mx-4 text-gray-500 font-light text-sm leading-relaxed'>
          Welcome to Social Minds! Boost your social skills with realistic scenarios. 
          Receive instant feedback, track your progress, and build confidence in a 
          supportive environment. Start your journey to confident communication today!
        </Text>
      
        <View className='mt-7 font-light bg-gray-700 p-2 rounded-md'>
        <Link href='/sign-in' className='text-gray-100'>Get started</Link>
        </View>
      </View>
      
    </SafeAreaView>
  );
}
// com.dhruv.socialminds
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#000000',
    fontSize: 30
  }
});
