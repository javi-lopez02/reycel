import axios from "./axios";

export const getSedeRequest = () => {
  return axios.get(`/sedes`);
};