import { Link, router } from 'expo-router';
import { Image, StyleSheet, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Social Minds</Text>
      <Link href='/sign-in'>Get started</Link>
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
