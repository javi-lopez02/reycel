import { Category, createCategoryProps } from "../../type";
import axios from "./axios";

export const categoryRequest = async (): Promise<Category[]> => {
  const res = await axios.get(`/products/category`);
  const category = res.data.data
  return category
}; 

export const getCategoryByIdRequest = async (id: string): Promise<Category> => {
  const res = await axios.get(`/products/category/${id}`);
  const category = res.data.data
  return category
};

export const createCategoryRequest = async ({name, profitsBySell}: createCategoryProps): Promise<Category> => {
  const res = await axios.post(`/products/category`, { name, profitsBySell });
  const category = res.data.data
  return category
};

export const updateCategoryRequest = async ({id, name, profitsBySell}: createCategoryProps): Promise<Category> => {
  const res = await axios.put(`/products/category/${id}`, { name, profitsBySell });
  const category = res.data.data
  return category
};

export const deleteCategoryRequest = async (id: string): Promise<void> => {
  return await axios.delete(`/products/category/${id}`);
};
