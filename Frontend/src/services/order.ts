import axios from "./axios";

export const getOrderRequest = () => {
  return axios.get(`products/order`);
};

export const addItemOrderRequest = (id: string, quantity: number) => {
  return axios.post(`products/order?p=${id}`, {quantity});
};

export const updateOrderItemRequest = (id: string, quantity: number, price: number) => {
  return axios.put(`products/order?p=${id}`, {quantity, price});
};

export const deleteOrderItemRequest = (id: string) => {
  return axios.delete(`products/order?p=${id}`);
};