import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

//reducer
import { updateUserAsync } from 'features/auth/authSlice';

//component

const CheckoutForm = () => {
  const [pesron, setPerson] = useState({});
const [selectAddress, setSelectAddress] = useState(null);
const [paymentMathod, setPaymentMathod] = useState('card');


  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setPerson(user);
  }, [user]);

  const checkoutHandeler = (data) => {
    dispatch(
      updateUserAsync({ 
        //sarab
        ...user,
        addresses: [
          ...user.addresses,
          {
            first_name: data.first_name,
            last_name: data.last_name,
            email:data.email,
            phone: data.phone,
            country: data.country,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
          },
        ],
      })
    );
    reset();
  };

  const addressHandeler = (address)=> {
    
    setSelectAddress(address);

  }

  const paymentHandeler = (paymentMode) => {
  
    setPaymentMathod(paymentMode);
  };

  return (
    <form onSubmit={handleSubmit(checkoutHandeler)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('first_name', {
                    required: 'first name required',
                  })}
                  id="first_name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <small className="text-red-500">
                  {errors?.first_name?.message}
                </small>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('last_name', {
                    required: 'last name required',
                  })}
                  id="last_name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <small className="text-red-500">
                  {errors?.last_name?.message}
                </small>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'email is required',
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  value={pesron.country || ''}
                  {...register('country', {
                    required: 'counter name required',
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                <small className="text-red-500">
                  {errors?.country?.message}
                </small>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'phone is required',
                    pattern: {
                      value: /[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}/g,
                      message: '10 digit number required',
                    },
                  })}
                  id="phone"
                  className="block w-full rounded-md border-0 py-1.5
                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <small className="text-red-500">{errors?.phone?.message}</small>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street', {
                    required: 'street is required',
                  })}
                  id="street"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <small className="text-red-500">
                  {errors?.street?.message}
                </small>
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city', {
                    required: 'city is required',
                  })}
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <small className="text-red-500">{errors?.city?.message}</small>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state', {
                    required: 'state is required',
                  })}
                  id="state"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <small className="text-red-500">{errors?.state?.message}</small>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('zip', {
                    required: 'zipis required',
                    pattern: {
                      value: /^\d{5}(\-?\d{4})?$/gm,
                      message: `Valid: 58701-0124; 587010124; 58701`,
                    },
                  })}
                  id="postal_code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <small className="text-red-500">{errors?.zip?.message}</small>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Address
          </button>
        </div>

        <div className="border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Address
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose for exesting address
          </p>{' '}
          <div className="mt-6 space-y-6">
            {user.addresses.length > 0 &&
              user.addresses.map((address, ind) => {
                return (
                  <div
                    key={ind}
                    className="flex w-full items-center gap-x-6 border py-4 px-4 rounded-md"
                  >
                    <input
                      name="address"
                      type="radio"
                      onChange={() => addressHandeler(address)}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm w-full font-medium leading-6  text-gray-900"
                    >
                      <div className=" border-gray-200">
                        <dt className="font-medium text-gray-900">{`${address.first_name} ${address.last_name}`}</dt>
                        <dd className="mt-2 text-sm text-gray-500">
                          {`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}
                        </dd>
                      </div>
                    </label>
                  </div>
                );
              })}
          </div>
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Payment Methods
              </legend>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    name="payment"
                    type="radio"
                    onChange={() => paymentHandeler('cash')}
                    checked={paymentMathod === 'cash'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cash on delivery
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    name="payment"
                    type="radio"
                    onChange={() => paymentHandeler('card')}
                    checked={paymentMathod === 'card'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Card / Online / UPI
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          {/* <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save Details
            </button>
          </div> */}
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
