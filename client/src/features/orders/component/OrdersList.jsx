import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

//reducers
import { fetchOrderItemsAsync, resetOrders } from 'features/orders/orderSlice';

//component
import helperFun from 'utility/commonFun'

const OrdersList = () => {
  const { user } = useSelector((state) => state.auth);
  const { OrderItems } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useLayoutEffect(() => {

    const dataObj = {
      id: user.id,
      sortby: 'date',
      orderby: 'desc',
    };

    dispatch(fetchOrderItemsAsync(dataObj));
    dispatch(resetOrders());
  }, []);

  
  return (
    <>
    
      {OrderItems?.length > 0 &&
        OrderItems.map((cartItem) => {
          return (
            <div className="pointer-events-auto my-6 ">
              <div className="flex h-full flex-col overflow-y-scroll bg-white">
                <div className="flex-1  overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        Date: {new Date(cartItem.date).toLocaleDateString()}{ ' '}
                        {helperFun.formatAMPM(new Date(cartItem.date))}
                        {cartItem.items.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.imageSrc}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="ml-4">${product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.color}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {product.quantity}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex border-t border-gray-200 justify-between py-4 mt-4 text-base font-medium text-gray-900">
                    <strong>Subtotal</strong>
                    <strong>${cartItem.total}</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default OrdersList;
