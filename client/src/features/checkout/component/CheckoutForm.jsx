import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

//reducer
import { updateUserAsync } from 'features/auth/authSlice';
import { orderDetails } from 'features/checkout/checkoutSlice';

//component
import InputField from 'common/InputField';
import SelectField from 'common/SelectField';

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
    setSelectAddress(user.diliveryAddress);
  }, [user]);

  const checkoutHandeler = (data) => {
    dispatch(
      updateUserAsync({
        ...user,
        addresses: [
          ...user.addresses,
          {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
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

  const addressHandeler = (address) => {
    setSelectAddress(address);
  };

  const paymentHandeler = (paymentMode) => {
    setPaymentMathod(paymentMode);
  };

  useEffect(() => {
    const obj = { address: selectAddress, paymentMode: paymentMathod };
    dispatch(orderDetails({ ...obj }));
    
  }, [selectAddress, paymentMathod]);

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
                <InputField
                  type="text"
                  register={register}
                  name="first_name"
                  reqText="first - name required"
                  disabled={false}
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
                <InputField
                  type="text"
                  register={register}
                  name="last_name"
                  reqText="last - name required"
                  disabled={false}
                  id="last_name"
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
                <InputField
                  type="email"
                  register={register}
                  name="email"
                  reqText="email is required"
                  disabled={false}
                  id="email"
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
                <SelectField
                  register={register}
                  name="country"
                  reqText="country required"
                  disabled={false}
                  id="country"
                />

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
                <InputField
                  type="tel"
                  register={register}
                  name="phone"
                  reqText="phone is required"
                  pattern={true}
                  condition={{
                    value: /[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}/g,
                    message: '10 digit number required',
                  }}
                  disabled={false}
                  id="email"
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
                <InputField
                  type="text"
                  register={register}
                  name="street"
                  reqText="street is required"
                  disabled={false}
                  id="street"
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
                <InputField
                  type="text"
                  register={register}
                  name="city"
                  reqText="city is required"
                  disabled={false}
                  id="city"
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
                <InputField
                  type="text"
                  register={register}
                  name="state"
                  reqText="state is required"
                  disabled={false}
                  id="state"
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
                <InputField
                  type="tel"
                  register={register}
                  name="zip"
                  reqText="zip is required"
                  pattern={true}
                  condition={{
                    value: /^\d{5}(\-?\d{4})?$/gm,
                    message: `Valid: 58701-0124; 587010124; 58701`,
                  }}
                  disabled={false}
                  id="email"
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
            Last updated Address
          </h2>
          <div className="mt-1 text-sm leading-6 text-gray-600">
            <div className=" border-gray-200">
              <dt className="font-medium text-gray-900">{`${user.diliveryAddress.first_name} ${user.diliveryAddress.last_name}`}</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {`${user.diliveryAddress.street}, ${user.diliveryAddress.city}, ${user.diliveryAddress.state}, ${user.diliveryAddress.zip}`}
              </dd>
            </div>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose from exesting address
          </p>

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
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
