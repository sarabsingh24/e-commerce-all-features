import React, { useState } from 'react';
import CartDetail from 'features/cart/component/CartDetail';

const Checkout = ({ IsCheckout }) => {
  const [open, setOpen] = useState(false);

  return <CartDetail setOpen={setOpen} IsCheckout={IsCheckout} />;
};

export default Checkout;
