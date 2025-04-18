import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { RootState, store } from '@/store';
import './globals.css';

function ProtectedLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)' || segments[0] === 'movies';
    const isSignInScreen = segments.join('/') === 'signin';
    if (!isAuthenticated && inAuthGroup) {
      // Redirect to sign-in if trying to access protected routes
      router.replace('/signin');
    } else if (isAuthenticated && isSignInScreen) {
      // Redirect to home if authenticated and trying to access sign-in
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, router]);

  return (
    <>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='movies/[id]' options={{ headerShown: false }} />
        <Stack.Screen name='signin' options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ProtectedLayout />
    </Provider>
  );
}
