import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { SET_AUTHENTICATED } from '@/store/auth/auth.actions';
import { icons } from '@/constants/icons';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email && password) {
      dispatch(SET_AUTHENTICATED({ user: { email, password } }));
    }
  };

  return (
    <SafeAreaView className={'bg-primary flex-1 px-10'}>
      <View className={'flex justify-center items-center flex-1 flex-col px-5'}>
        <View
          className={
            'flex flex-col gap-5 justify-center items-start bg-amber-50 w-full min-h-14 rounded-2xl shadow-lg p-5'
          }>
          <Text className={'font-semibold'}>Sign In</Text>
          <TextInput
            className={'flex w-full'}
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            className={'flex w-full'}
            placeholder='Password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={handleSignIn}
            className={
              'bg-accent w-full rounded-lg py-3.5 flex flex-row items-center justify-center'
            }>
            <Text className={'text-white font-semibold text-base'}>Sign In</Text>
            <Image source={icons.arrow} className='size-5 mr-1 mt-0.5' tintColor='#fff' />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignIn;
