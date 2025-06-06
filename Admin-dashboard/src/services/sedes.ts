import { Key } from "react";
import axios from "./axios";

interface Sede {
  image: string;
  direction: string;
  phone: string;
  workers: Key[];
}

export const getSedesRequest = () => {
  return axios.get(`/sedes`);
};

export const getWorkersRequest = () => {
  return axios.get(`/workers`);
};

export const getSedeIdRequest = (id: string) => {
  return axios.get(`/sedes/${id}`);
};

export const createSedeRequest = (data: Sede) => {
  return axios.post(`/sedes`, data);
};

export const updateSedeRequest = (id: string, data: Sede) => {
  return axios.put(`/sedes/${id}`, data);
};

export const deleteSedeRequest = (id: string) => {
  return axios.delete(`/sedes/${id}`);
};

