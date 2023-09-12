import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartAPI from './cartAPI';

const initialState = {
  cart: {},
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  IsMessage: false,
};

const createCartAsync = createAsyncThunk(
  'cart/create',
  async (obj, thunkAPI) => {
    try {
      return await cartAPI.createCart(obj);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: 'vart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.IsLoading = false;
      state.IsSuccess = false;
      state.IsError = false;
      state.IsMessage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCartAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(createCartAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = true;
        state.cart = action.payload;
      })
      .addCase(createCartAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
        state.cart = {};
        state.IsMessage = action.payload;
      });
  },
});
