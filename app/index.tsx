import { Link, router, Redirect } from 'expo-router';
import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from './context/app-provider';

export default function HomeScreen() {

  const { isLogged } = useGlobalContext()!;

  if(isLogged) return <Redirect href='/home' />
  
  return <Redirect href='/(auth)/welcome' />
}