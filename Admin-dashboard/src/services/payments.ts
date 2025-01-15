import axios from "./axios";

export const getPaymentsRequest = () => {
  return axios.get(`/payment`);
};
