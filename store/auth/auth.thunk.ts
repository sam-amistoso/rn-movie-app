import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSession } from '@/services/appwrite_auth';
import { getErrorMessage } from '@/utilities';

export const fetchActiveSession = createAsyncThunk('auth/FETCH_ACTIVE_SESSION', async () => {
  try {
    const user = await getUserSession();
    return { user };
  } catch (error) {
    console.log('FETCH_ACTIVE_SESSION error:', error);
    const errorMessage = getErrorMessage(error);
    return Promise.reject(errorMessage);
  }
});
