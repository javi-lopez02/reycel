import axios from "./axios";

export const notificationReadRequest = (id : number) => {
  return axios.post(`notification/${id}`);
};

export const notificationReadAllRequest = () => {
  return axios.post(`notification/all`);
}

export const notificationDeleteRequest = (id: number) => {
  return axios.delete(`notification/${id}`);
}

export const notificationDeleteAllRequest = () => {
  return axios.delete(`notification/deleteAll`);
}

