
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from 'app/store'
import { Provider } from 'react-redux';


// component pages
import Home from 'pages/Home';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import CheckoutPage from 'pages/CheckoutPage'
import ProductDetailPage from 'pages/ProductDetailPage'

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
    path: '/product-detail',
    element: <ProductDetailPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
