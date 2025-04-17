export interface AppStateType {
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  isDarkMode: boolean;
  isFirstLaunch: boolean;
}

export const initialState: AppStateType = {
  isLoading: false,
  error: null,
  isConnected: true,
  isDarkMode: false,
  isFirstLaunch: true,
};
