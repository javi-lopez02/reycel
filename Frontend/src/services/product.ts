import axios from "./axios";

export const searchPproductRequest = (query: string, page: number) => {
  return axios.get(`/products/search?s=${query}&page=${page}`);
};
