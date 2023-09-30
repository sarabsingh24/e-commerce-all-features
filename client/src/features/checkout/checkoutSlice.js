import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  selectedAddress: {},
  selectedPaymentMode: '',
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  IsMessage: false,
};

const cartSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderDetails: (state, action) => {
      state.selectedAddress = action.payload.address;
      state.selectedPaymentMode = action.payload.paymentMode;
    },
    resetForm: (state) => {
      state.IsLoading = false;
      state.IsSuccess = false;
      state.IsError = false;
      state.IsMessage = false;
    },
  },
});

const { actions, reducer } = cartSlice;

export const { orderDetails,resetForm } = actions;

export default reducer;
