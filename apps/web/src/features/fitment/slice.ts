import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { components } from '@monorepo/api';
import { setBikeCookie } from './cookie';

interface FitmentState {
  selectedBike: components['schemas']['FitmentBike'] | null;
  isPickerModalOpen: boolean;
}

const initialState: FitmentState = {
  selectedBike: null,
  isPickerModalOpen: false,
};

export const fitmentSlice = createSlice({
  name: 'fitment',
  initialState,
  reducers: {
    setSelectedBike: (state, action: PayloadAction<components['schemas']['FitmentBike'] | null>) => {
      state.selectedBike = action.payload;
      setBikeCookie(action.payload);
    },
    hydrateBikeFromCookie: (state, action: PayloadAction<components['schemas']['FitmentBike'] | null>) => {
      state.selectedBike = action.payload;
    },
    openPickerModal: (state) => {
      state.isPickerModalOpen = true;
    },
    closePickerModal: (state) => {
      state.isPickerModalOpen = false;
    },
    clearSelectedBike: (state) => {
      state.selectedBike = null;
      setBikeCookie(null);
    },
  },
});

export const {
  setSelectedBike,
  hydrateBikeFromCookie,
  openPickerModal,
  closePickerModal,
  clearSelectedBike,
} = fitmentSlice.actions;

export default fitmentSlice.reducer;
