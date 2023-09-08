import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productAPI from './productAPI';

const initialState = {
  products: [],
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  message: '',
};

//fetchAllProductAsync
export const getProductsAsync = createAsyncThunk(
  'product/getProducts',
  async (_, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.user.token;
      return await productAPI.getProducts();
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

//fetch products using filter
export const getProductsByFiltereAsync = createAsyncThunk(
  'product/getFilteredProducts',
  async (filterObj, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.user.token;

      return await productAPI.getFilteredProducts(filterObj);
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductStatus: (state) => {
      state.IsLoading = false;
      state.IsSuccess = false;
      state.IsError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.IsLoading = true;
        state.products = action.payload;
        state.IsSuccess = true;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.IsSuccess = false;
        state.message = action.payload;
      })

      //fetch by filtered data
      .addCase(getProductsByFiltereAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(getProductsByFiltereAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.products = action.payload;
        state.IsSuccess = true;
      })
      .addCase(getProductsByFiltereAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.IsSuccess = false;
        state.message = action.payload;
      });
  },
});

const { actions, reducer } = productSlice;

export const { resetProductStatus } = actions;

export default reducer;
