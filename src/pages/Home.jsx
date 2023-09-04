import React from 'react';
import NavBar from 'common/NavBar';
import ProductList from 'features/product/component/ProductList';
const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList />
      </NavBar>
    </div>
  );
};

export default Home;
