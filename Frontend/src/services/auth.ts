import axios from './axios'
import {UserAuth} from '../types'

export const RegisterRequest = (user: UserAuth) => {
  return axios.post(`/auth/register`, user);
};

export const LoginRequest = (user: UserAuth) => {
  return axios.post(`/auth/login`, user);
};

export const LogoutRequest = () => {
  return axios.post(`/auth/logout`)
}

export const confirmEmailRequest = (value: string) => {
  return axios.get(`/auth/confirm/${value}`)
}

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);



export const requestPasswordReset = async (email: string) => {
  const response = await axios.post('/auth/forgot-password', { email });
  return response.data;
};

export const verifyResetToken = async (token: string) => {
  const response = await axios.get(`/auth/reset-password/${token}`);
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await axios.post(`/auth/reset-password/${token}`, {
    password: newPassword,
  });
  return response.data;
};