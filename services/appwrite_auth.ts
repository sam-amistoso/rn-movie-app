import { Platform } from 'react-native';
import { Account, Client } from 'react-native-appwrite';

const BUNDLE_ID = process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID!;
const PACKAGE_NAME = process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME!;

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

switch (Platform.OS) {
  case 'ios':
    client.setPlatform(BUNDLE_ID);
    break;
  case 'android':
    client.setPlatform(PACKAGE_NAME);
    break;
}

const account = new Account(client);

export const getUserSession = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const createEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await account.createEmailPasswordSession(email, password);
    return await account.get();
  } catch (error) {
    console.error(error);
    throw { error };
  }
};

export const deleteSession = async () => {
  try {
    await account.deleteSession('current');
    return 'Successfully logged out';
  } catch (error) {
    console.log(error);
    throw { error };
  }
};
