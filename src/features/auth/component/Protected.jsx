import React from 'react'
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom'

const Protected = ({children}) => {
    const { IslogedIn } = useSelector((state) => state.auth);

if (!IslogedIn) {
  return <Navigate to="/login" replace={true} />;
}

  return children;
}

export default Protected