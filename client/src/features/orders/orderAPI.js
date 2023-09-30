import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/// fetch orders=========================================
const getOrderedItems = async (dataObj) => {
   const response = await axios.get(
     `${BASE_URL}/orders?userId=${dataObj.id}&_sort=${dataObj.sortby}&_order=${dataObj.orderby}`
   );
  // const response = await axios.get(BASE_URL + '/orders?userId=' + dataObj.id );
  const data = await response.data;
  return data;
};

/// Add to Order List=========================================
const createOrdersList = async (obj) => {
  console.log(obj);
  const response = await axios.post(BASE_URL + '/orders', obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  return data;
};

/// update to cart=========================================
const updateCartItem = async (obj) => {
  const response = await axios.patch(BASE_URL + '/cart/' + obj.id, obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;

  return data;
};



const orderAPI = { getOrderedItems, createOrdersList };
export default orderAPI;
