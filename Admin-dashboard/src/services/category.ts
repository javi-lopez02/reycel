import axios from "./axios";

export const categoryRequest = () => {
  return axios.get(`/products/category`);
};