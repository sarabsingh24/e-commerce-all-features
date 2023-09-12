import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productAPI from './productAPI';

const initialState = {
  products: [],
  totalItems: 0,
  categories: [],
  brands: [],
  colors: [],
  sizes: [],
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

//fetch products categories
export const getProductsCategoriesAsync = createAsyncThunk(
  'product/categories',
  async (_, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.user.token;

      return await productAPI.getCategories();
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

//fetch products brands
export const getProductsBrandsAsync = createAsyncThunk(
  'product/brands',
  async (_, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.user.token;

      return await productAPI.getBrands();
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

//fetch products colors
export const getProductsColorsAsync = createAsyncThunk(
  'product/colors',
  async (_, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.user.token;

      return await productAPI.getColors();
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

//fetch products sizes
export const getProductsSizesAsync = createAsyncThunk(
  'product/sizes',
  async (_, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.user.token;

      return await productAPI.getSizes();
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
        state.products = action.payload.products;
        state.totalItems = action.payload.totalCount;
        state.IsSuccess = true;
      })
      .addCase(getProductsByFiltereAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.IsSuccess = false;
        state.message = action.payload;
      })
      //fetch by categories
      .addCase(getProductsCategoriesAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(getProductsCategoriesAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.categories = action.payload;
        state.IsSuccess = true;
      })
      .addCase(getProductsCategoriesAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.IsSuccess = false;
        state.message = action.payload;
      })
      //fetch by Brands
      .addCase(getProductsBrandsAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(getProductsBrandsAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.brands = action.payload;
        state.IsSuccess = true;
      })
      .addCase(getProductsBrandsAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.IsSuccess = false;
        state.message = action.payload;
      })
      //fetch by Colors
      .addCase(getProductsColorsAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(getProductsColorsAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.colors = action.payload;
        state.IsSuccess = true;
      })
      .addCase(getProductsColorsAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.IsSuccess = false;
        state.message = action.payload;
      })
      //fetch by Colors
      .addCase(getProductsSizesAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(getProductsSizesAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.sizes = action.payload;
        state.IsSuccess = true;
      })
      .addCase(getProductsSizesAsync.rejected, (state, action) => {
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
