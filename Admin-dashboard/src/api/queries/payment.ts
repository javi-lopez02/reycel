import { useQuery } from "@tanstack/react-query";
import { PropsGetTable } from "../../type";

import { getPaymentsRequest } from "../services/payments";

export const usePaymentQuery = () => {
  const paymentQuery = ({
    filterValue,
    sortDescriptor,
    rowsPerPage,
    page,
  }: PropsGetTable) => {
    return useQuery({
      queryKey: ["payment", { page, filterValue, sortDescriptor, rowsPerPage }],
      queryFn: () =>
        getPaymentsRequest({
          filterValue,
          sortDescriptor,
          rowsPerPage,
          page,
        }),
      staleTime: 1000 * 60 * 2,
      retry: 2,
    });
  };

  /*   const orderItemsQuery = (id: string | undefined) => {
    const isEditMode = Boolean(id);
    return useQuery({
      queryKey: ["order", id], // La clave de consulta incluye el ID
      queryFn: () => getOrderItemsRequest(id!),
      enabled: isEditMode, // Solo ejecuta la consulta si itemId existe
    });
  }; */

  return {
    paymentQuery,
  };
};
