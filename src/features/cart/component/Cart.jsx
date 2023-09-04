import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {Link} from 'react-router-dom'

//component
import QuantityCounter from 'common/QuantityCounter';
import CartDetail from 'features/cart/component/CartDetail'

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

const Cart = ({ isCart, setIsCart }) => {
  const [products, setProducts] = useState(productsList);
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

  //cart side bar
  useEffect(() => {
    if (isCart) {
      setOpen(!open);
      setIsCart(!isCart);
    }
  }, [isCart]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <CartDetail
                    setOpen={setOpen}
                    products={products}
                    qtyHandeler={qtyHandeler}
                    IsCheckout={false}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
