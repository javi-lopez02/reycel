import axios from './axios'

export const productRequest = (page:number) => {
  return axios.get(`/products?page=${page}`);
};

