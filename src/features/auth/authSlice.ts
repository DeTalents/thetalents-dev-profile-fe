import { removeCookie, setCookie } from '@/utils/cookieUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setGoogleAuth: (state, action: PayloadAction<string>) => {
      state.token = `Bearer ${action.payload}`;
      state.isAuthenticated = true;
      // Set cookie when setting auth
      setCookie('token', `Bearer ${action.payload}`, 7 * 24 * 60 * 60);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      // Remove cookie on logout
      removeCookie('token');
    },
  },
});

export const { setGoogleAuth, logout } = authSlice.actions;
export default authSlice.reducer;
