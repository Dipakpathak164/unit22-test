import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  bikeModel?: string;
  createdAt: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; userProfile?: Partial<UserProfile> }>
    ) => {
      state.isAuthenticated = true;
      state.user = {
        id: 'usr-' + Date.now(),
        name: action.payload.userProfile?.name || action.payload.email.split('@')[0],
        email: action.payload.email,
        phone: action.payload.userProfile?.phone || '+91 9876543210',
        bikeModel: action.payload.userProfile?.bikeModel || 'Royal Enfield Interceptor 650',
        createdAt: new Date().toISOString().split('T')[0],
        address: {
          street: 'Indiranagar 100ft Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
        },
      };
    },
    register: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        phone: string;
        bikeModel?: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = {
        id: 'usr-' + Date.now(),
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        bikeModel: action.payload.bikeModel || 'Royal Enfield Interceptor 650',
        createdAt: new Date().toISOString().split('T')[0],
        address: {
          street: 'Indiranagar 100ft Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
        },
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, register, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
