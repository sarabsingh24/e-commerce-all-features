import React, { useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

// export const Controller = ({ control, register, name, rules, render }) => {
//   const value = useWatch({ control, name });
//   const props = register(name, rules);

//   return render({
//     value,
//     onChange: (e) =>
//       props.onChange({
//         target: {
//           name,
//           value: e.target.value,
//         },
//       }),
//     onblur: props.onblur,
//     name: props.name,
//   });
// };

const SelectField = ({
  type,
  name,
  register,
  reqText,
  disabled,
  pattern,
  condition,
}) => {
  return (
    <>
      <select
        id="country"
        {...register(name, {
          required: reqText,
        })}
        disabled={disabled ? true : false}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      >
        <option></option>
        <option>India</option>
        <option>United States</option>
        <option>Canada</option>
        <option>Mexico</option>
      </select>
    </>
  );
};

export default SelectField;
