import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PaymentMethod } from "../../type";

import { toast } from "sonner";
import {
  createPaymentMethodRequest,
  deletePaymentMethodRequest,
  updatePaymentMethodRequest,
  getPaymentMethodByIdRequest,
  getPaymentMethodRequest,
} from "../services/paymentMethod";

type PaymentMethodMutationContext = {
  previousPaymentMethods?: PaymentMethod[];
  previousPaymentMethod?: PaymentMethod;
};

export const usePaymentMethodQuery = () => {
  const queryClient = useQueryClient();

  const paymentMethodQuery = useQuery<PaymentMethod[]>({
    queryKey: ["paymentMethod"],
    queryFn: getPaymentMethodRequest,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const paymentMethodById = (id: string | undefined) => {
    const isEditMode = Boolean(id);
    return useQuery({
      queryKey: ["paymentMethod", id], // La clave de consulta incluye el ID
      queryFn: () => getPaymentMethodByIdRequest(id!),
      enabled: isEditMode, // Solo ejecuta la consulta si itemId existe
    });
  };

  const createPaymentMethodMutation = useMutation<
    PaymentMethod,
    AxiosError,
    Omit<PaymentMethod, "id"| "_count" | "createdAt">,
    PaymentMethodMutationContext
  >({
    mutationFn: createPaymentMethodRequest,
    onMutate: async (newPaymentMethod) => {
      await queryClient.cancelQueries({ queryKey: ["paymentMethod"] });

      const previousPaymentMethods =
        queryClient.getQueryData<PaymentMethod[]>(["paymentMethod"]) || [];

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<PaymentMethod[]>(["paymentMethod"], (old = []) => [
        ...old,
        { ...newPaymentMethod, id: tempId, isPending: true },
      ]);

      return { previousPaymentMethods };
    },
    onError: (err, newPaymentMethod, context) => {
      queryClient.setQueryData(["paymentMethod"], context?.previousPaymentMethods);
      console.log(newPaymentMethod);
      toast.error(err.message);
    },
    onSuccess: (createdPaymentMethod) => {
      queryClient.setQueryData<PaymentMethod[]>(["paymentMethod"], (old = []) =>
        old.map((paymentMethod) =>
          paymentMethod.id === `temp-${createdPaymentMethod.id}` ? createdPaymentMethod : paymentMethod
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
    },
  });

  const updatePaymentMethodMutation = useMutation<
    PaymentMethod,
    AxiosError,
    PaymentMethod,
    PaymentMethodMutationContext
  >({
    mutationFn: updatePaymentMethodRequest,
    onMutate: async (updatedPaymentMethod) => {
      await queryClient.cancelQueries({ queryKey: ["paymentMethod"] });
      await queryClient.cancelQueries({
        queryKey: ["paymentMethod", updatedPaymentMethod.id],
      });

      const previousPaymentMethods =
        queryClient.getQueryData<PaymentMethod[]>(["paymentMethod"]) || [];

      const previousPaymentMethod = queryClient.getQueryData<PaymentMethod>([
        "paymentMethod",
        updatedPaymentMethod.id,
      ]);

      queryClient.setQueryData<PaymentMethod[]>(["paymentMethod"], (old = []) =>
        old.map((paymentMethod) =>
          paymentMethod.id === updatedPaymentMethod.id
            ? { ...paymentMethod, ...updatedPaymentMethod, isPending: true }
            : paymentMethod
        )
      );
      queryClient.setQueryData(["paymentMethod", updatedPaymentMethod.id], updatedPaymentMethod);

      return { previousPaymentMethods, previousPaymentMethod };
    },
    onError: (err, updatedPaymentMethod, context) => {
      if (context?.previousPaymentMethod) {
        queryClient.setQueryData(["paymentMethod"], context.previousPaymentMethods);
      }
      if (context?.previousPaymentMethod) {
        queryClient.setQueryData(
          ["paymentMethod", updatedPaymentMethod.id],
          context.previousPaymentMethod
        );
      }
      toast.error(err.message);
    },
    onSettled: (updatedPaymentMethod) => {
      if (updatedPaymentMethod) {
        queryClient.invalidateQueries({
          queryKey: ["paymentMethod", updatedPaymentMethod.id],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
    },
  });

  const deletePaymentMethodMutation = useMutation<
    void,
    AxiosError,
    string,
    PaymentMethodMutationContext
  >({
    mutationFn: deletePaymentMethodRequest,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["paymentMethod"] });

      const previousPaymentMethods =
        queryClient.getQueryData<PaymentMethod[]>(["paymentMethod"]) || [];

      queryClient.setQueryData<PaymentMethod[]>(["paymentMethod"], (old = []) =>
        old.filter((paymentMethod) => paymentMethod.id !== id)
      );

      return { previousPaymentMethods };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["paymentMethod"], context?.previousPaymentMethods);
      toast.error(err.message);
      console.log(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
    },
  });

  return {
    paymentMethodQuery,
    paymentMethodById,

    createPaymentMethod: createPaymentMethodMutation.mutateAsync,
    updatePaymentMethod: updatePaymentMethodMutation.mutateAsync,
    deletePaymentMethod: deletePaymentMethodMutation.mutateAsync,

    isCreating: createPaymentMethodMutation.isPending,
    isUpdating: updatePaymentMethodMutation.isPending,
    isDeleting: deletePaymentMethodMutation.isPending,

    createError: createPaymentMethodMutation.error,
    updateError: updatePaymentMethodMutation.error,
    deleteError: deletePaymentMethodMutation.error,

    resetCreateError: createPaymentMethodMutation.reset,
    resetUpdateError: updatePaymentMethodMutation.reset,
    resetDeleteError: deletePaymentMethodMutation.reset,
  };
};
