import { Order } from "../type";
import axios from "./axios";

export const getOrderRequest = () => {
  return axios.get(`/order`);
};

export const createOrderRequest = (order: Order) => {
  return axios.post(`/order`, order);
};

export const UpdateOrderRequest = (id: string, order: Order) => {
  return axios.put(`/order/${id}`, order);
};

export const deleteOrderRequest = (id: string) => {
  return axios.delete(`/order/${id}`);
};


export const getOrderItemsRequest = (id: string) => {
  return axios.get(`/order/items/${id}`);
};