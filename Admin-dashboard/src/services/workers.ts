import axios from "./axios";

export const getWorkersRequest = () => {
  return axios.get(`/worker`);
};

interface WorkerRequest {
  email: string;
  username: string;
  password: string;
  image: string;
  sedeId?: string;
  role?: "MODERATOR" | "OWNER";
}

export const createWorkersRequest = (worker: WorkerRequest) => {
  return axios.post(`/worker`, worker);
};

export const editWorkersRequest = (id: string, worker: WorkerRequest) => {
  return axios.put(`/worker/${id}`, worker);
};

export const deleteWorkersRequest = (id: string) => {
  return axios.delete(`/worker/${id}`);
};
