import React from 'react'

const SelectedImage = ({ productInfo }) => {
  return (
    <div>
     
      <div className="py-6">
        {Object.keys(productInfo).length > 0 && (
          <img
            src={productInfo.images[0].src}
            alt={productInfo.images[0].alt}
            className="h-full w-full object-cover object-center "
          />
        )}
      </div>
      <div className="flex flex-wrap gap-2  ">
        {/* Image gallery */}
        {Object.keys(productInfo).length > 0 &&
          productInfo.images.map((img) => {
            return (
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden group rounded-md border  border-gray-200">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75  "
                />
              </div>
            );
          })}
      </div>
      <p className="text-gray-500 mt-8">
        Discounted Price:{' '}
        <span className="text-3xl tracking-tight text-gray-900 ">
          $
          {Math.round(
            productInfo.price * (1 - productInfo.discountPercentage / 100)
          )}
        </span>
      </p>
      <p className="text-gray-500">
        Actual Price:{' '}
        <span className="text-2xl tracking-tight text-red-500 line-through">
          ${productInfo.price}
        </span>
      </p>
    </div>
  );
};

export default SelectedImage