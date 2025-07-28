import axios from "./axios";
import { Worker, WorkerRequest } from "../../type";


export const getWorkersRequest = async (): Promise<Worker[]> => {
  const res = await axios.get(`/worker`);
  const worker = res.data;
  console.log(worker)
  return worker;
};

export const getWorkersByIdRequest = async (id: string): Promise<Worker> => {
  const res = await axios.get(`/worker/${id}`);
  const worker = res.data;
  return worker;
};

export const createWorkersRequest = async (data: WorkerRequest): Promise<Worker> => {
  const res = await axios.post(`/worker`, data);
  const newWorker = res.data.data;
  return newWorker;
};

export const editWorkersRequest = async ({
  id,
  ...data
}: WorkerRequest): Promise<Worker> => {
  const res = await axios.put(`/worker/${id}`, data);
  return res.data.data;
};

export const deleteWorkersRequest = async (id: string): Promise<void> => {
  return await axios.delete(`/worker/${id}`);
};
