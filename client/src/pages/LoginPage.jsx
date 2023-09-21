import React from 'react'
import Login from 'features/auth/component/Login';
import NavBar from 'common/NavBar';

const LoginPage = () => {
  return (
    <NavBar pageTitle="Sign In">
      <Login />
    </NavBar>
  );
}

export default LoginPage