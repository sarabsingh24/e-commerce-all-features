import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from './authAPI';

const initialState = {
  user: {},
  IslogedIn: false,
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  IsMessage: false,
};

//Register user============================================
export const createUserAsync = createAsyncThunk(
  'users/register',
  async (obj, thunkAPI) => {
    try {
      return await userAPI.registerUser(obj);
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

//Login user============================================
export const loginUserAsync = createAsyncThunk(
  'users/login',
  async (obj, thunkAPI) => {
    try {
      return await userAPI.loginUser(obj);
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.IsLoading = false;
      state.IsSuccess = false;
      state.IsError = false;
      state.IsMessage = false;
    },
    logOut: (state) => {
      state.IslogedIn = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        // state.user = action.payload;
        state.IsSuccess = true;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.IsMessage = action.payload;
      })

      /// Login user -----------------------------
      .addCase(loginUserAsync.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.IslogedIn = true;
        state.user = action.payload;
        state.IsSuccess = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = false;
        state.IslogedIn = false;
        state.user = {};
        state.IsError = true;
        state.IsMessage = action.payload;
      });
  },
});
const { actions, reducer } = userSlice;
export const { resetUser, logOut } = actions;

export default reducer;
