import axios from "./axios";

export const ratingRequest = (id: string, value: number) => {
  return axios.post(`products/rating/${id}`, {value});
};