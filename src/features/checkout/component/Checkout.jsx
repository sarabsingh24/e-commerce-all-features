import React, { useState } from 'react';
import CartDetail from 'features/cart/component/CartDetail';

const productsList = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

const Checkout = ({ IsCheckout }) => {
  const [products, setProducts] = useState(productsList);
  const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);

  //cart Qty counter
  const qtyHandeler = (val, id) => {
    const updateProducts = products.map((product) => {
      if (product.id === id) {
        if (val === 'decrement') {
          if (product.quantity !== 1) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return { ...product, quantity: 1 };
          }
        } else {
          return { ...product, quantity: product.quantity + 1 };
        }
      }
      return product;
    });

    setProducts(updateProducts);
  };
  const cartHandeler = () => {
    setCartOpen(!cartOpen);
  };
  return (
    <CartDetail
      setOpen={setOpen}
      products={products}
      qtyHandeler={qtyHandeler}
      IsCheckout={IsCheckout}
    />
  );
};

export default Checkout;
