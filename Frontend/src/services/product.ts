import axios from './axios'

export const productRequest = () => {
  return axios.get(`/products`);
};

