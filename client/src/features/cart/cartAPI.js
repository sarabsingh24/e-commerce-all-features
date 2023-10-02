import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/// fetch to cart=========================================
const getCartItems = async (userId) => {
  const response = await axios.get(BASE_URL + '/cart?userId=' + userId);
  const data = await response.data;
  return data;
};

/// Add to cart=========================================
const createCart = async (obj) => {

  const response = await axios.post(BASE_URL + '/cart', obj, {
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

/// remove to cart=========================================
const removeFormCart = async (itemId) => {
 
  const response = await axios.delete(BASE_URL + '/cart/' + itemId);
  const data = await response.data;
  const newdata = { id: itemId };

  return newdata;
};

/// clear  cart=========================================
const clearCart = async (userId) => {
  const cartItems = await getCartItems(userId);
  const data = [];

  for (let key of cartItems) {
    await removeFormCart(key.id);
  }
  
  return data;
};

const cartAPI = {
  createCart,
  updateCartItem,
  removeFormCart,
  getCartItems,
  clearCart,
};
export default cartAPI;
