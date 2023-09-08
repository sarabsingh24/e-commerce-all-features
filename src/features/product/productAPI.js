import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getProducts = async () => {
  const response = await axios.get(BASE_URL + '/products');
  const data = await response.data;
  return data;
};

const getFilteredProducts = async (filterObj) => {
  const response = await axios.get(BASE_URL + `/products?${filterObj}`);
  const data = await response.data;
  return data;
};

const productAPI = { getProducts, getFilteredProducts };

export default productAPI;
