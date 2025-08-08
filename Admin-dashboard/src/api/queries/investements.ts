import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { InvestmentRequest, Investments } from "../../type";

import { toast } from "sonner";
import { getInvestmentsRequest, createInvestmentsRequest } from "../services/investments";


type InvestmentMutationContext = {
  previousInvestments?: Investments[];
  previousInvestment?: Investments;
};

export const useInvestmentQuery = () => {
  const queryClient = useQueryClient();

  const investmentQuery = useQuery<Investments[]>({
    queryKey: ["investment"],
    queryFn: getInvestmentsRequest,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const createInvestmentMutation = useMutation<
    Investments,
    AxiosError,
    Omit<InvestmentRequest, "id">,
    InvestmentMutationContext
  >({
    mutationFn: createInvestmentsRequest,
    onMutate: async (newInvestment) => {
      await queryClient.cancelQueries({ queryKey: ["investment"] });

      const previousInvestments =
        queryClient.getQueryData<Investments[]>(["investment"]) || [];

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<Investments[]>(["investment"], (old = []) => [
        ...old,
        { ...newInvestment, id: tempId, isPending: true },
      ]);

      return { previousInvestments };
    },
    onError: (err, newInvestment, context) => {
      queryClient.setQueryData(["investment"], context?.previousInvestments);
      console.log(newInvestment);
      toast.error(err.message);
    },
    onSuccess: (createdInvestment) => {
      queryClient.setQueryData<Investments[]>(["investment"], (old = []) =>
        old.map((investment) =>
          investment.id === `temp-${createdInvestment.id}` ? createdInvestment : investment
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["investment"] });
    },
  });

  return {
    investmentQuery,

    createInvestment: createInvestmentMutation.mutateAsync,

    isCreating: createInvestmentMutation.isPending,

    createError: createInvestmentMutation.error,

    resetCreateError: createInvestmentMutation.reset,
  };
};
