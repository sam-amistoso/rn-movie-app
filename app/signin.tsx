import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { SET_AUTHENTICATED } from '@/store/auth/auth.actions';
import { icons } from '@/constants/icons';
import useFetch from '@/hooks/useFetch';
import { createEmailPassword, getUserSession } from '@/services/appwrite_auth';
import { useRouter } from 'expo-router';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    data: session,
    error: sessionError,
    loading: isSessionLoading,
  } = useFetch(() => getUserSession());
  console.log('🚀 SignIn session: ', session);
  const {
    data,
    error: loginError,
    loading: isLoading,
    refetch,
  } = useFetch(() => createEmailPassword({ email, password }), false);

  useEffect(() => {
    if (session) {
      dispatch(SET_AUTHENTICATED({ user: { email: session.email } }));
      router.replace('/(tabs)');
    }
  }, [session]);

  useEffect(() => {
    if (!isLoading && !loginError && data) {
      console.log('🚀 SignIn data: ', data);
      dispatch(SET_AUTHENTICATED({ user: { email } }));
    }
  }, [data, isLoading, loginError]);

  const handleSignIn = async () => {
    if (email && password) {
      try {
        // Trigger the authentication call
        await refetch();
      } catch (error) {
        console.error('Sign in failed:', error);
      }
    }
  };

  return (
    <SafeAreaView className={'bg-primary flex-1 px-10'}>
      <View className={'flex justify-center items-center flex-1 flex-col px-5'}>
        <View
          className={
            'flex flex-col gap-5 items-start bg-amber-50 w-full min-h-[320px] rounded-2xl shadow-lg p-5 relative'
          }>
          <Text className={'w-full text-3xl font-semibold text-center'}>Sign In</Text>
          <Text>Email</Text>
          <TextInput
            className={'flex w-full mb-5'}
            placeholder='Enter your email'
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize={'none'}
            autoComplete={'off'}
          />
          <Text>Password</Text>
          <TextInput
            className={'flex w-full'}
            placeholder='Password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          {loginError && (
            <Text className='text-red-500 mt-3'>Login failed. Please check your credentials.</Text>
          )}
          {sessionError && <Text className='text-red-500 mt-3'>Fetching session failed.</Text>}
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSignIn}
            className={
              'absolute bottom-5 left-5 bg-accent w-full rounded-lg py-3.5 flex flex-row items-center justify-center'
            }>
            <Text className={'text-white font-semibold text-base'}>
              {isLoading ? 'Loading...' : 'Login'}
            </Text>
            {isLoading ? (
              <ActivityIndicator color='#fff' size='small' style={{ marginLeft: 5 }} />
            ) : (
              <Image source={icons.arrow} className='size-5 mr-1 mt-0.5' tintColor='#fff' />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignIn;
