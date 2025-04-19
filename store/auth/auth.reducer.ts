import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchActiveSession } from './auth.thunk';

interface AuthState {
  isAuthenticated: boolean;
  isReady: boolean;
  appLoading: boolean;
  user: any | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isReady: false,
  appLoading: true,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_AUTHENTICATED: (state, action: PayloadAction<{ user: any }>) => {
      state.isAuthenticated = true;
      state.isReady = true;
      state.user = action.payload.user;
    },
    SET_LOGOUT: (state) => {
      state.isAuthenticated = false;
      state.isReady = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveSession.pending, (state) => {
        state.appLoading = true;
        state.isReady = false;
        state.isAuthenticated = false;
      })
      .addCase(fetchActiveSession.fulfilled, (state, action) => {
        state.appLoading = false;
        state.isReady = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(fetchActiveSession.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.appLoading = false;
        state.isReady = true;
        state.user = null;
        state.error = action.error?.message || 'Failed to fetch active session';
      });
  },
});

export default authSlice.reducer;
