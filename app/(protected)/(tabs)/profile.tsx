import React from 'react';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/store/hooks';
import { SET_LOGOUT } from '@/store/auth/auth.actions';
import { deleteSession } from '@/services/appwrite_auth';
import { icons } from '@/constants/icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      await deleteSession();
      dispatch(SET_LOGOUT());
      router.replace('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image source={icons.person} className='size-10' tintColor='#fff' />
        <Text className='text-gray-500 text-base'>Profile</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          className='flex flex-row w-full items-center justify-center bg-accent rounded-lg py-3.5 mt-10'>
          <Text className='text-white font-semibold text-base'>Sign Out</Text>
          <Image source={icons.arrow} className='size-5 mr-1 mt-0.5' tintColor='#fff' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
