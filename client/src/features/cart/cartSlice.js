import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartAPI from './cartAPI';

const initialState = {
  cartItems: [],
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  IsMessage: false,
};

/////get all cart items
export const fetchCartItemsAsync = createAsyncThunk(
  'cart/allItems',
  async (userId, thunkAPI) => {
    try {
      return await cartAPI.getCartItems(userId);
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

/////add to  cart
export const createCartAsync = createAsyncThunk(
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

/////update from cart
export const updateCartAsync = createAsyncThunk(
  'cart/update',
  async (obj, thunkAPI) => {
    try {
      return await cartAPI.updateCartItem(obj);
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

/////Delete from cart
export const deleteCartItemAsync = createAsyncThunk(
  'cart/delete',
  async (itemId, thunkAPI) => {
    try {
      return await cartAPI.removeFormCart(itemId);
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

///clear cart
/////Delete from cart
export const clearCartItemAsync = createAsyncThunk(
  'cart/clear',
  async (userId, thunkAPI) => {
    try {
      return await cartAPI.clearCart(userId);
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
  name: 'cart',
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
      //get item from cart
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.cartItems = action.payload;
        state.IsSuccess = true;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
        state.cartItems = [];
        state.IsMessage = action.payload;
      })
      //add item in cart
      .addCase(createCartAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(createCartAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.cartItems.push(action.payload);
        state.IsSuccess = true;
      })
      .addCase(createCartAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
        state.cartItems = [];
        state.IsMessage = action.payload;
      })

      //Update item in cart
      .addCase(updateCartAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        state.IsLoading = false;
        state.cartItems[index] = action.payload;
        state.IsSuccess = true;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
        state.cartItems = [];
        state.IsMessage = action.payload;
      })

      //Delete item from cart
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        const filterData = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.IsLoading = false;
        state.cartItems = filterData;
        state.IsSuccess = true;
      })
      .addCase(deleteCartItemAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
        state.cartItems = [];
        state.IsMessage = action.payload;
      })

      //clear cart
      .addCase(clearCartItemAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(clearCartItemAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.cartItems = action.payload;
        state.IsSuccess = true;
      })
      .addCase(clearCartItemAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
        state.cartItems = [];
        state.IsMessage = action.payload;
      });
  },
});

const { actions, reducer } = cartSlice;

export const { resetCart, clearCart } = actions;

export default reducer;
