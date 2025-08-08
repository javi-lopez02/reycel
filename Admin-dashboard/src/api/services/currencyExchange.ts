import { CurrencyExchange, CurrencyRequest } from "../../type";
import axios from "./axios";

export const editCurrencyRequest = async ({id, ...currency}: CurrencyRequest) :Promise<CurrencyExchange> => {
  const res = await axios.put(`/editCurrency/${id}`, currency);
  const currencyExchange = res.data.data;
  return currencyExchange;
};

export const addCurrencyRequest = async (currency: CurrencyRequest): Promise<CurrencyExchange> => {
  const res = await axios.post(`/addCurrency`, currency);
  const currencyExchange = res.data.data;
  return currencyExchange;
};

export const getCurrencyRequest = async (): Promise<CurrencyExchange[]> => {
  const res = await axios.get("/currency");
  const currencyExchange = res.data.data;
  return currencyExchange;
};
