import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { products } from 'data/ProductData';
import { StarIcon } from '@heroicons/react/20/solid';
import { useSelector, useDispatch } from 'react-redux';

//reducer
import {
  getProductsAsync,
  resetProductStatus,
} from 'features/product/productSlice';

//component
import Spinner from 'common/Spinner'


const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const ProductList = () => {
  const { products, IsLoading, IsSuccess, IsError, message } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (IsError) {
      console.log(message);
    }

    if (IsSuccess) {
      console.log('hurray!');
    }

    dispatch(resetProductStatus());
  });

  if (IsLoading) {
    
    return <Spinner />;
  }
  return (
    <div className="bg-white">
     
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.length > 0 &&
            products?.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product?.imageSrc}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product-detail/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    {/* Reviews */}
                    <div className="mt-1">
                      <h3 className="sr-only">Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                reviews.average > rating
                                  ? 'text-yellow-500'
                                  : 'text-gray-300',
                                'h-3 w-3 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {reviews.average} out of 5 stars
                        </p>
                        <a
                          href={reviews.href}
                          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {reviews.totalCount} reviews
                        </a>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      $
                      {Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm font-medium line-through text-red-400">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
