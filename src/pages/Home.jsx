import React from 'react';
import NavBar from 'common/NavBar';
import Product from 'features/product/component/Product';
const Home = () => {
  return (
    <div>
      <NavBar pageTitle="Dashboard">
        <Product />
      </NavBar>
    </div>
  );
};

export default Home;
