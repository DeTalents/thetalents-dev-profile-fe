import { removeCookie, setCookie } from '@/utils/cookieUtils';
import { decodeToken } from '@/utils/tokenUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setGoogleAuth: (state, action: PayloadAction<string>) => {
      state.token = `Bearer ${action.payload}`;
      state.isAuthenticated = true;
      state.role = decodeToken(action.payload);
      // Set cookie when setting auth
      setCookie('token', `Bearer ${action.payload}`, 7 * 24 * 60 * 60);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      // Remove cookie on logout
      removeCookie('token');
    },
  },
});

export const { setGoogleAuth, logout } = authSlice.actions;
export default authSlice.reducer;
