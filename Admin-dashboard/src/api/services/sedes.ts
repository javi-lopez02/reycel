import axios from "./axios";
import { Sede, SedeRequest } from "../../type";

export const getSedesRequest = async (): Promise<Sede[]> => {
  const res = await axios.get(`/sedes`);
  const sedes = res.data.data;
  return sedes;
};

export const getSedeIdRequest = async (id: string): Promise<Sede> => {
  const res = await axios.get(`/sedes/${id}`);
  const sede = res.data.data;
  return sede;
};

export const createSedeRequest = async (data: SedeRequest): Promise<Sede> => {
  const res = await axios.post(`/sedes`, data);
  const sede = res.data.data;
  return sede;
};

export const updateSedeRequest = async ({id, ...data}: SedeRequest): Promise<Sede> => {
  const res = await axios.put(`/sedes/${id}`, data);
  const sede = res.data.data;
  return sede;
};

export const addLossesRequest = async (id: string, monto: number): Promise<Sede> => {
  const res = await axios.put(`/losses/${id}`, { monto });
  const sede = res.data.data;
  return sede;
};

export const deleteSedeRequest = async (id: string): Promise<void> => {
  return axios.delete(`/sedes/${id}`);
};
