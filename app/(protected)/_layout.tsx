import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { appLoadingSelector, authSelector, isReadySelector } from '@/store/auth/auth.selector';
import { fetchActiveSession } from '@/store/auth/auth.thunk';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

export default function ProtectedLayout() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(authSelector);
  const isReady = useAppSelector(isReadySelector);
  const appLoading = useAppSelector(appLoadingSelector);

  useEffect(() => {
    dispatch(fetchActiveSession());
  }, []);

  if (appLoading) {
    return (
      <SafeAreaView className='flex flex-col h-full items-center justify-center gap-5'>
        <Text>Loading...</Text>
        <ActivityIndicator size='large' className='text-dark-100' />
      </SafeAreaView>
    );
  }

  if (!isReady) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Redirect href='/signin' />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='movies/[id]' options={{ headerShown: false }} />
    </Stack>
  );
}
