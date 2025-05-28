import axios from "./axios";

export const getOrderRequest = () => {
  return axios.get(`/order`);
};

export const getOrderItemsRequest = (id: string | undefined) => {
  return axios.get(`/order/${id}`);
};

export const addItemOrderRequest = (id: string, quantity: number) => {
  return axios.post(`/order?p=${id}`, { quantity });
};

export const updateOrderItemRequest = (
  id: string,
  quantity: number,
  price: number
) => {
  return axios.put(`/order?p=${id}`, { quantity, price });
};

export const deleteOrderItemRequest = (id: string) => {
  return axios.delete(`/order?p=${id}`);
};

interface ConfirmParams {
  transactionID?: string;
  orderID?: string;
  amount?: number;
  paymentMethod: string
  userId?: string;
}

export const confirmOrderRequest = (params: ConfirmParams) => {
  return axios.post(`/order/confirm/`, params);
};
