import { FiltersType } from "../types";
import axios from "./axios";

export type SortOption = {
  field: "createdAt" | "price" | "rating"; // Campos permitidos
  order: "asc" | "desc"; // Órdenes permitidas
};

export const searchPproductRequest = (
  query: string,
  page: number,
  { minPrice="", maxPrice="", categoriy="", rating="", color="" }: FiltersType,
  sort: SortOption[] | []
) => {
  const sortString = JSON.stringify(sort);
  return axios.get(
    `/products/search?category=${categoriy}&color=${color}&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}&s=${query}&page=${page}&sort=${encodeURIComponent(sortString)}`
  );
};

export const categoryRequest = () => {
  return axios.get(`/products/category`);
};

export const productIDRequest = (query: string) => {
  return axios.get(`/products?p=${query}`);
};

export const createCommentRequest = (content : string, query: string) => {
  return axios.post(`/products/comment?p=${query}`, {content});
}