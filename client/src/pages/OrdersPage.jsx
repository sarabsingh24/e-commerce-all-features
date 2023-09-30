import React from 'react';

//components
import OrdersList from 'features/orders/component/OrdersList'
import NavBar from 'common/NavBar';

const Orders = () => {
  return (
    <NavBar pageTitle="Your order List ">
      <OrdersList />
    </NavBar>
  );
};

export default Orders;
