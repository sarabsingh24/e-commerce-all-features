import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/// fetch products==============================================
const getProducts = async () => {
  const response = await axios.get(BASE_URL + '/products');
  const data = await response.data;
  return data;
};

/// fetch products with query,sort pagination==============================================
const getFilteredProducts = async (filterObj) => {
  let queryString = '';
  for (let obj of filterObj) {
    for (let key in obj) {
      queryString += `${key}=${obj[key]}&`; 
    }
  }

  const response = await axios.get(BASE_URL + `/products?${queryString}`);
  const data = await response.data;
  const totalCount = (await response.headers.get('X-Total-Count')) || 0;

  return { products: data, totalCount: +totalCount };
};



/// fetch categories==============================================
const getCategories = async () => {
  const response = await axios.get(BASE_URL + '/categories');
  const data = await response.data;
  return data;
};


/// fetch brand==============================================
const getBrands = async () => {
  const response = await axios.get(BASE_URL + '/brands');
  const data = await response.data;
  return data;
};

/// fetch colors==============================================
const getColors = async () => {
  const response = await axios.get(BASE_URL + '/colors');
  const data = await response.data;
  return data;
};

/// fetch sizes==============================================
const getSizes = async () => {
  const response = await axios.get(BASE_URL + '/sizes');
  const data = await response.data;
  return data;
};

const productAPI = {
  getProducts,
  getFilteredProducts,
  getBrands,
  getCategories,
  getColors,
  getSizes,
};

export default productAPI;
