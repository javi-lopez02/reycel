import { User } from "../../type";
import axios from "./axios";

export const getUsersRequest = async (): Promise<User[]> => {
  const res = await axios.get(`/users`);
  const user = res.data;
  return user;
};

export const getUsersByIdRequest = async (id: string): Promise<User> => {
  const res = await axios.get(`/user/${id}`);
  const user = res.data.data;
  return user;
};

export const deleteUsersRequest = async (id: string): Promise<void> => {
  return axios.delete(`/user/${id}`);
};
