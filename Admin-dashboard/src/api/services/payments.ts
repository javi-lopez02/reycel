import { MetaData, Payment, PropsGetTable } from "../../type";
import axios from "./axios";

export const getPaymentsRequest = async ({
  filterValue,
  sortDescriptor,
  rowsPerPage,
  page,
}: PropsGetTable): Promise<{ payment: Payment[]; metaData: MetaData }> => {
  const jsonString = JSON.stringify(sortDescriptor);
  const encodedParams = `${encodeURIComponent(jsonString)}`;

  const res = await axios.get(
    `/payment?filterValue=${filterValue}&sortDescriptor=${encodedParams}&rowsPerPage=${rowsPerPage}&page=${page}`
  );

  const payment = res.data.data;
  const metaData = res.data.meta;
  return { payment, metaData };
};
