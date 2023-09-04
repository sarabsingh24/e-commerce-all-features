import React from 'react';

const QuantityCounter = ({ id, value, qtyHandeler }) => {
  return (
    <div>
      Qty:
      <div>
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => qtyHandeler('decrement', id)}
        >
          -
        </button>
        <span className="rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {value}
        </span>
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => qtyHandeler('increment', id)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityCounter;
