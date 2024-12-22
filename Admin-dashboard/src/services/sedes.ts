import axios from "./axios";

export const getSedesRequest = () => {
  return axios.get(`/sedes`);
};
