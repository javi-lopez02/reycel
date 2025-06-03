import { TransactionType } from "../types";
import axios from "./axios";


export const transactionRequest = (value: TransactionType) => {
  return axios.post(`/send_message_bot`, value);
};

export const validateTransactionRequest = (orderID: number) => {
  return axios.post(`/validateTransaction`, {orderID});
};

export const getPaymentMethodRequest = () => {
  return axios.get("/paymentMethod");
};
