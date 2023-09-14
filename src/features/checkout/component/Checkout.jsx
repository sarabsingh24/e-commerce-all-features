import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartDetail from 'features/cart/component/CartDetail';

const Checkout = ({ IsCheckout }) => {
  const [open, setOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return <CartDetail setOpen={setOpen} IsCheckout={IsCheckout} />;
};

export default Checkout;
