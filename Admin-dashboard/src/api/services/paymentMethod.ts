import { PaymentMethod } from "../../type";
import axios from "./axios";

export const getPaymentMethodRequest = async (): Promise<PaymentMethod[]> => {
  const res = await axios.get(`/paymentMethod`);
  const paymentMethod = res.data.data;
  return paymentMethod;
};

export const getPaymentMethodByIdRequest = async (
  id: string
): Promise<PaymentMethod> => {
  const res = await axios.get(`/paymentMethod/${id}`);
  const paymentMethod = res.data.data;
  return paymentMethod;
};

export const createPaymentMethodRequest = async (
  data: Omit<PaymentMethod, "id">
): Promise<PaymentMethod> => {
  const res = await axios.post(`/paymentMethod`, data);
  const paymentMethod = res.data.data;
  return paymentMethod;
};

export const updatePaymentMethodRequest = async ({
  id,
  ...data
}: PaymentMethod): Promise<PaymentMethod> => {
  const res = await axios.put(`/paymentMethod/${id}`, data);
  const paymentMethod = res.data.data;
  return paymentMethod;
};

export const deletePaymentMethodRequest = async (id: string): Promise<void> => {
  return axios.delete(`/paymentMethod/${id}`);
};
