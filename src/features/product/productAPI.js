import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getProducts = async () => {
  const response = await axios.get(BASE_URL + '/products');
  const data = await response.data;
  return data;
};

const getFilteredProducts = async (filterObj) => {
  let queryString = '';
  for (let obj of filterObj) {
    for (let key in obj) {
      queryString += `${key}=${obj[key]}&`;
    }
  }
  const response = await axios.get(BASE_URL + `/products?${queryString}`);
  const data = await response.data;
  return data;
};

const productAPI = { getProducts, getFilteredProducts };

export default productAPI;
