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
  investments: number;
  inventoryCount: number;
  categoryId: string;
  ram?: number;
  storage?: number;
  battery?: number;
  mpxCameraFront?: number;
  mpxCameraBack?: number;
  sedeId: string;
}

export const createProductRequest = (product: CreateProps) => {
  return axios.post(`/product`, product);
};

export const updateProductRequest = (
  id: string,
  productUpdated: CreateProps
) => {
  console.log({ productUpdated });
  return axios.put(`/product/${id}`, productUpdated);
};

export const deleteProductRequest = (id: string) => {
  return axios.delete(`/product/${id}`);
};
