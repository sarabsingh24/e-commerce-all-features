import { configureStore, combineReducers } from '@reduxjs/toolkit';

//Reducers
import productReducer from 'features/product/productSlice';
import authRuducer from 'features/auth/authSlice';
import cartRuducer from 'features/cart/cartSlice';
import orderReducer from 'features/orders/orderSlice';
import checkoutReducer from 'features/checkout/checkoutSlice'


import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authRuducer,
  product: productReducer,
  cart: cartRuducer,
  checkoutDetail: checkoutReducer,
  orders: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
