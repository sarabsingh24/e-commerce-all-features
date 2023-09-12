import React from 'react'
import Signup from 'features/auth/component/Signup'
import NavBar from 'common/NavBar';

const SignupPage = () => {
  return (
    <NavBar pageTitle="Sign Up">
      <Signup />
    </NavBar>
  );
}

export default SignupPage