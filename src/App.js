import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    element: <Home />,
  },
  {
    path: '/product-detail/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
