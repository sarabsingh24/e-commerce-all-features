
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// component pages
import Home from 'pages/Home';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
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
    element: <Home />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
