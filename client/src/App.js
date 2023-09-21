import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Protected from 'features/auth/component/Protected'
//reducer
import {
  getProductsCategoriesAsync,
  getProductsBrandsAsync,
  getProductsColorsAsync,
  getProductsSizesAsync,
} from 'features/product/productSlice';

import { fetchCartItemsAsync } from 'features/cart/cartSlice';

// component pages
import Home from 'pages/Home';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import CheckoutPage from 'pages/CheckoutPage';
import ProductDetailPage from 'pages/ProductDetailPage';
import CartPage from 'pages/CartPage' 

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
]);

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsCategoriesAsync());
    dispatch(getProductsBrandsAsync());
    dispatch(getProductsColorsAsync());
    dispatch(getProductsSizesAsync());
    dispatch(fetchCartItemsAsync(user.id));
  }, [dispatch, user.id]);


  return <RouterProvider router={router} />;
}

export default App;
