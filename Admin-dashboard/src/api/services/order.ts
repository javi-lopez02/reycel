import { MetaData, Order, OrderItem, PropsGetTable } from "../../type";
import axios from "./axios";

export const getOrderRequest = async ({
  filterValue,
  sortDescriptor,
  rowsPerPage,
  page,
}: PropsGetTable): Promise<{ order: Order[]; metaData: MetaData }> => {
  const jsonString = JSON.stringify(sortDescriptor);
  const encodedParams = `${encodeURIComponent(jsonString)}`;

  const res = await axios.get(
    `/order?filterValue=${filterValue}&sortDescriptor=${encodedParams}&rowsPerPage=${rowsPerPage}&page=${page}`
  );
  const order = res.data.data;
  const metaData = res.data.meta;
  return { order, metaData };
};

export const getOrderItemsRequest = async (
  id: string
): Promise<OrderItem[]> => {
  const res = await axios.get(`/order/${id}`);
  const orderItems = res.data.data.orderItems;
  return orderItems;
};
