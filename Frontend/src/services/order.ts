import axios from "./axios";

export const getOrderRequest = () => {
  return axios.get(`products/order`);
};

export const addItemOrderRequest = (id: string, quantity: number) => {
  return axios.post(`products/order?p=${id}`, {quantity});
};