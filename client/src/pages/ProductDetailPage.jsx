import React from 'react'
import NavBar from 'common/NavBar';
import ProductDetail from 'features/product/component/ProductDetail';
const ProductDetailPage = () => {
  return (
    <NavBar pageTitle="Product Detail">
      <ProductDetail />
    </NavBar>
  );
}

export default ProductDetailPage