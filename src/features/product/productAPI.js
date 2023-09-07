import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getProducts = async () => {
  const response = await axios(BASE_URL + '/products');
  const data = await response.data;
  return data;
};

const productAPI = { getProducts };

export default productAPI;
