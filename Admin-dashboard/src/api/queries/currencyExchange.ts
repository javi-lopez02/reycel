import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CurrencyExchange, CurrencyRequest } from "../../type";

import { toast } from "sonner";
import { addCurrencyRequest, editCurrencyRequest, getCurrencyRequest } from "../services/currencyExchange";


type CurrencyMutationContext = {
  previousCurrencys?: CurrencyExchange[];
  previousCurrency?: CurrencyExchange;
};

export const useCurrencyQuery = () => {
  const queryClient = useQueryClient();

  const currencyQuery = useQuery<CurrencyExchange[]>({
    queryKey: ["currency"],
    queryFn: getCurrencyRequest,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });


  const createCurrencyMutation = useMutation<
    CurrencyExchange,
    AxiosError,
    Omit<CurrencyRequest, "id">,
    CurrencyMutationContext
  >({
    mutationFn: addCurrencyRequest,
    onMutate: async (newCurrency) => {
      await queryClient.cancelQueries({ queryKey: ["currency"] });

      const previousCurrencys =
        queryClient.getQueryData<CurrencyExchange[]>(["currency"]) || [];

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<CurrencyExchange[]>(["currency"], (old = []) => [
        ...old,
        { ...newCurrency, id: tempId, isPending: true,  },
      ]);

      return { previousCurrencys };
    },
    onError: (err, newCurrency, context) => {
      queryClient.setQueryData(["currency"], context?.previousCurrencys);
      console.log(newCurrency);
      toast.error(err.message);
    },
    onSuccess: (createdCurrency) => {
      queryClient.setQueryData<CurrencyExchange[]>(["currency"], (old = []) =>
        old.map((currency) =>
          currency.id === `temp-${createdCurrency.id}` ? createdCurrency : currency
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currency"] });
    },
  });

  const updateCurrencyMutation = useMutation<
    CurrencyExchange,
    AxiosError,
    CurrencyRequest,
    CurrencyMutationContext
  >({
    mutationFn: editCurrencyRequest,
    onMutate: async (updatedCurrency) => {
      await queryClient.cancelQueries({ queryKey: ["currency"] });
      await queryClient.cancelQueries({
        queryKey: ["currency", updatedCurrency.id],
      });

      const previousCurrencys =
        queryClient.getQueryData<CurrencyExchange[]>(["currency"]) || [];

      const previousCurrency = queryClient.getQueryData<CurrencyExchange>([
        "currency",
        updatedCurrency.id,
      ]);

      queryClient.setQueryData<CurrencyExchange[]>(["currency"], (old = []) =>
        old.map((currency) =>
          currency.id === updatedCurrency.id
            ? { ...currency, ...updatedCurrency, isPending: true }
            : currency
        )
      );
      queryClient.setQueryData(["currency", updatedCurrency.id], updatedCurrency);

      return { previousCurrencys, previousCurrency };
    },
    onError: (err, updatedCurrency, context) => {
      if (context?.previousCurrency) {
        queryClient.setQueryData(["currency"], context.previousCurrencys);
      }
      if (context?.previousCurrency) {
        queryClient.setQueryData(
          ["currency", updatedCurrency.id],
          context.previousCurrency
        );
      }
      toast.error(err.message);
    },
    onSettled: (updatedCurrency) => {
      if (updatedCurrency) {
        queryClient.invalidateQueries({
          queryKey: ["currency", updatedCurrency.id],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["currency"] });
    },
  });


  return {
    currencyQuery,

    createCurrency: createCurrencyMutation.mutateAsync,
    updateCurrency: updateCurrencyMutation.mutateAsync,

    isCreating: createCurrencyMutation.isPending,
    isUpdating: updateCurrencyMutation.isPending,

    createError: createCurrencyMutation.error,
    updateError: updateCurrencyMutation.error,

    resetCreateError: createCurrencyMutation.reset,
    resetUpdateError: updateCurrencyMutation.reset,
  };
}
