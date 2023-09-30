import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderAPI from './orderAPI'

const initialState = {
  OrderItems: [],
  processComplete:false,
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  IsMessage: false,
};

/////get all cart items
export const fetchOrderItemsAsync = createAsyncThunk(
  'orders/allOrders',
  async (dataObj, thunkAPI) => {
    try {
      return await orderAPI.getOrderedItems(dataObj);
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
export const createOrderAsync = createAsyncThunk(
  'orders/create',
  async (obj, thunkAPI) => {
    try {
      return await orderAPI.createOrdersList(obj);
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
// export const updateCartAsync = createAsyncThunk(
//   'orders/update',
//   async (obj, thunkAPI) => {
//     try {
//       return await cartAPI.updateCartItem(obj);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );



const cartSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.IsLoading = false;
      state.IsSuccess = false;
      state.IsError = false;
      state.IsMessage = false;
      state.processComplete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //get item from cart
      .addCase(fetchOrderItemsAsync.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(fetchOrderItemsAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.OrderItems = action.payload;
        state.IsSuccess = true;
      })
      .addCase(fetchOrderItemsAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
        state.cartItems = [];
        state.IsMessage = action.payload;
      })
      //add item in cart
      .addCase(createOrderAsync.pending, (state) => {
        state.IsLoading = true;
         state.processComplete = false;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.OrderItems.push(action.payload);
        state.IsSuccess = true;
        state.processComplete= true;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
         state.processComplete = false;
        state.cartItems = [];
        state.IsMessage = action.payload;
        
      });

  },
});

const { actions, reducer } = cartSlice;

export const { resetOrders } = actions;

export default reducer;
