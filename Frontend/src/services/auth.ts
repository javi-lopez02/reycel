import axios from './axios'
import {User} from '../types'

export const RegisterRequest = (user: User) => {
  return axios.post(`/auth/register`, user);
};

export const LoginRequest = (user: User) => {
  return axios.post(`/auth/login`, user);
};

export const LogoutRequest = () => {
  return axios.post(`/auth/logout`)
}

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);