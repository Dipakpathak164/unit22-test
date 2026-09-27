import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_ADMIN_USER } from '@monorepo/mocks';
import { components } from '@monorepo/api';

interface AdminAuthState {
  isAdminAuthenticated: boolean;
  adminUser: components['schemas']['AdminUser'] | null;
}

const initialState: AdminAuthState = {
  isAdminAuthenticated: false,
  adminUser: null,
};

export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLogin: (
      state,
      action: PayloadAction<{ email: string }>
    ) => {
      state.isAdminAuthenticated = true;
      state.adminUser = {
        id: 'user-1',
        email: action.payload.email || 'admin@motorcycle-store.in',
        name: action.payload.email.split('@')[0].toUpperCase(),
        role: 'Super Admin',
        permissions: ['product.read', 'product.write', 'order.read', 'order.write'],
      };
    },
    adminLogout: (state) => {
      state.isAdminAuthenticated = false;
      state.adminUser = null;
    },
  },
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
