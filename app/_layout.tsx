import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { store } from '@/store';
import './globals.css';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(protected)' options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name='signin' options={{ headerShown: false, animation: 'none' }} />
      </Stack>
    </Provider>
  );
};
export default RootLayout;
