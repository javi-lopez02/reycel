import axios from "./axios";

export const getProductRequest = () => {
  return axios.get(`/product`);
};

interface CreateProps {
  name: string;
  description: string;
  price: number;
  rating: number;
  imagen: string;
  inventoryCount: number;
  categoryId: string;
}

export const createProductRequest = (product: CreateProps) => {
  return axios.post(`/product`, product);
};


export const deleteProductRequest = (id: string) => {
  return axios.delete(`/product/${id}`);
};
