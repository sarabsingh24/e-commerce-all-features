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

// component pages
import Home from 'pages/Home';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import CheckoutPage from 'pages/CheckoutPage';
import ProductDetailPage from 'pages/ProductDetailPage';

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
    path: '/checkout',
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
]);

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsCategoriesAsync());
    dispatch(getProductsBrandsAsync());
    dispatch(getProductsColorsAsync());
    dispatch(getProductsSizesAsync());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
