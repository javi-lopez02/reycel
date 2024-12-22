import axios from "./axios";

export const categoryRequest = () => {
  return axios.get(`/products/category`);
};

export const createCategoryRequest = (name: string) => {
  return axios.post(`/products/category`, { name });
};

export const updateCategoryRequest = (id: string, name: string) => {
  return axios.put(`/products/category/${id}`, { name });
};

export const deleteCategoryRequest = (id: string) => {
  return axios.delete(`/products/category/${id}`);
};
