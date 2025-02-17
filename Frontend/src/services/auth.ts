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