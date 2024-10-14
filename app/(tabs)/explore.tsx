import Ionicons from '@expo/vector-icons/Ionicons';
import { View, ActivityIndicator, Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy?: number | '';
  altitude?: number | '';
  heading?: number | '';
  speed?: number | '';
}

export default function Explore() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationResult.coords;

      const userLocation: LocationCoords = { latitude, longitude };

      setLocation(userLocation);
      setMapRegion({
        latitude: userLocation.latitude || 15.4572,
        longitude: userLocation.longitude || 73.8072,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setLoading(false);
      console.log('User Location:', userLocation);
    })();
  }, []);

  return (
    <SafeAreaView className='h-screen'>
      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className='mt-4 text-lg text-white'>Fetching your location...</Text>
        </View>
      ) : mapRegion ? (
        <MapView
          provider={PROVIDER_DEFAULT}
          style={{ width: '100%', height: '100%' }}
          region={mapRegion}
          showsUserLocation={true} 
        >
          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="You are here"
            />
          )}
        </MapView>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-lg text-red-600'>Error fetching location.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
