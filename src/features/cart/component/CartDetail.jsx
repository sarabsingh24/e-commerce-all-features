import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

//reducer
import { deleteCartItemAsync, updateCartAsync } from 'features/cart/cartSlice';

//components
import QuantityCounter from 'common/QuantityCounter';

const CartDetail = ({
  setOpen,
  IsCheckout,
}) => {
  const [total, setTotal] = useState(0);

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //cart Qty counter
  const qtyHandeler = (val, id) => {
    const filterProduct = cartItems.find((crtItem) => crtItem.id === id);

    let updateProduct = {};

    if (val === 'decrement') {
      if (filterProduct.quantity !== 1) {
        const qty = filterProduct.quantity - 1;
        updateProduct = {
          ...filterProduct,
          quantity: qty,
        };
      } else {
        updateProduct = {
          ...filterProduct,
          quantity: 1,
        };
      }
    } else {
      const qty = filterProduct.quantity + 1;

      updateProduct = {
        ...filterProduct,
        quantity: qty,
      };
    }

    dispatch(updateCartAsync(updateProduct));
  };

  const removeHandeler = (id) => {
    dispatch(deleteCartItemAsync(id));
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const calculate = cartItems.reduce((amount, curr) => {
        const { price, quantity } = curr;
        amount += price * quantity;
        return amount;
      }, 0);

      setTotal(calculate);
    } else {
      setTotal(0);
    }
  }, [cartItems]);

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {!IsCheckout && (
          <div className="flex items-start justify-between">
            <h1 className="text-lg font-medium text-gray-900">Shopping cart</h1>

            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setOpen(false)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.length > 0 ? (
                cartItems.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4">
                            ${product.quantity * product.price}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <QuantityCounter
                            value={product.quantity}
                            qtyHandeler={qtyHandeler}
                            id={product.id}
                          />
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => removeHandeler(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className='text-center'>Your cart is empty</div>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${total}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {!IsCheckout ? 'Checkout' : 'Initiate Payment'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
