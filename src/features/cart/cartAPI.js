import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const createCart = async (obj) => {
  const response = await axios.post(BASE_URL + '/cart', obj, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.data;
  return data;
};

const cartAPI = { createCart };
export default cartAPI;
