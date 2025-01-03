import axios from "./axios";

interface UserRequest {
  userId: string
  username: string;
  email: string;
  password: string;
  image: string;
  sedeId?: string;
  role?: "USER" | "MODERADOR" | "ADMIN";
}

export const editUsersRequest = (user: UserRequest) => {
  return axios.put(`/user/`, user);
};
