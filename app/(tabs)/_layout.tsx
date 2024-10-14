import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme()!;

  return (
    <Tabs
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: '#ffffff',
    //   },
    // }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home'} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='add'
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add' : 'add'} color={color} />
          ),
          headerShown: false,
        }}
        />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Join',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people'} color={color} />
          ),
          headerShown: false,
        }}
      />
      
    </Tabs>
  );
}
