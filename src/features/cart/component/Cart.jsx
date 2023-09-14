import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

//component

import CartDetail from 'features/cart/component/CartDetail';

const Cart = ({ isCart, setIsCart }) => {
  const [open, setOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

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
                    products={cartItems}
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
