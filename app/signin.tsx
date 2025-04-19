import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/store/hooks';
import { SET_AUTHENTICATED } from '@/store/auth/auth.actions';
import { createEmailPassword, getUserSession } from '@/services/appwrite_auth';
import { icons } from '@/constants/icons';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSignIn = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        // Trigger the authentication call
        const user = await createEmailPassword({ email, password });
        console.log('🚀 handleSignIn user: ', user);
        if (user) {
          // Fetch the session after successful sign-in
          const session = await getUserSession();
          if (session) {
            console.log('🚀 handleSignIn session: ', session);
            // Dispatch the authenticated action with user data
            dispatch(SET_AUTHENTICATED({ user }));
            router.replace('/');
          }
        }
      } catch (error) {
        console.error('Sign in failed:', error);
        setLoginError(true);
      }
      setIsLoading(false);
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
