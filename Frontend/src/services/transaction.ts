import { TransactionType } from '../types';
import axios from './axios'

export const transactionRequest = (value: TransactionType) => {
  return axios.post(`/message`, value);
};