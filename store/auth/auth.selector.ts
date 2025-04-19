import { RootState } from '@/store';

export const authSelector = (state: RootState): boolean => state.auth.isAuthenticated;
export const userSelector = (state: RootState): any => state.auth.user;
export const isReadySelector = (state: RootState): any => state.auth.isReady;
export const appLoadingSelector = (state: RootState): boolean => state.auth.appLoading;
