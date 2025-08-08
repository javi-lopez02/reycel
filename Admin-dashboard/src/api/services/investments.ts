import { InvestmentRequest, Investments } from "../../type";
import axios from "./axios";


export const getInvestmentsRequest = async (): Promise<Investments[]> => {
  const res = await axios.get(`/losses`);
  console.log(res.data.data)
  const investments = res.data.data;
  return investments;
};

export const createInvestmentsRequest = async ({
  sedeId,
  ...data
}: InvestmentRequest): Promise<Investments> => {
  const res = await axios.post(`/losses/${sedeId}`, data);
  const investment = res.data.data;
  return investment;
};
