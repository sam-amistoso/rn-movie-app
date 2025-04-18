import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { store } from '@/store';
import './globals.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='movie/[id]' options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
