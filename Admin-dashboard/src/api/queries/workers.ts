import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Worker, WorkerRequest } from "../../type";

import { toast } from "sonner";
import {
  createWorkersRequest,
  deleteWorkersRequest,
  editWorkersRequest,
  getWorkersByIdRequest,
  getWorkersRequest,
} from "../services/workers";

type WorkerMutationContext = {
  previousWorkers?: Worker[];
  previousWorker?: Worker;
};

export const useWorker = () => {
  const queryClient = useQueryClient();

  const workerQuery = useQuery<Worker[]>({
    queryKey: ["worker"],
    queryFn: getWorkersRequest,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const workerById = (id: string | undefined) => {
    const isEditMode = Boolean(id);
    return useQuery({
      queryKey: ["worker", id], // La clave de consulta incluye el ID
      queryFn: () => getWorkersByIdRequest(id!),
      enabled: isEditMode, // Solo ejecuta la consulta si itemId existe
    });
  };

  const createWorkerMutation = useMutation<
    Worker,
    AxiosError,
    Omit<WorkerRequest, "id">,
    WorkerMutationContext
  >({
    mutationFn: createWorkersRequest,
    onMutate: async (newWorker) => {
      await queryClient.cancelQueries({ queryKey: ["worker"] });

      const previousWorkers =
        queryClient.getQueryData<Worker[]>(["worker"]) || [];

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<Worker[]>(["worker"], (old = []) => [
        ...old,
        { ...newWorker, id: tempId, isPending: true,  },
      ]);

      return { previousWorkers };
    },
    onError: (err, newWorker, context) => {
      queryClient.setQueryData(["worker"], context?.previousWorkers);
      console.log(newWorker);
      toast.error(err.message);
    },
    onSuccess: (createdWorker) => {
      queryClient.setQueryData<Worker[]>(["worker"], (old = []) =>
        old.map((worker) =>
          worker.id === `temp-${createdWorker.id}` ? createdWorker : worker
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["worker"] });
    },
  });

  const updateWorkerMutation = useMutation<
    Worker,
    AxiosError,
    WorkerRequest,
    WorkerMutationContext
  >({
    mutationFn: editWorkersRequest,
    onMutate: async (updatedWorker) => {
      await queryClient.cancelQueries({ queryKey: ["worker"] });
      await queryClient.cancelQueries({
        queryKey: ["worker", updatedWorker.id],
      });

      const previousWorkers =
        queryClient.getQueryData<Worker[]>(["worker"]) || [];

      const previousWorker = queryClient.getQueryData<Worker>([
        "worker",
        updatedWorker.id,
      ]);

      queryClient.setQueryData<Worker[]>(["worker"], (old = []) =>
        old.map((worker) =>
          worker.id === updatedWorker.id
            ? { ...worker, ...updatedWorker, isPending: true }
            : worker
        )
      );
      queryClient.setQueryData(["worker", updatedWorker.id], updatedWorker);

      return { previousWorkers, previousWorker };
    },
    onError: (err, updatedWorker, context) => {
      if (context?.previousWorker) {
        queryClient.setQueryData(["worker"], context.previousWorkers);
      }
      if (context?.previousWorker) {
        queryClient.setQueryData(
          ["worker", updatedWorker.id],
          context.previousWorker
        );
      }
      toast.error(err.message);
    },
    onSettled: (updatedWorker) => {
      if (updatedWorker) {
        queryClient.invalidateQueries({
          queryKey: ["worker", updatedWorker.id],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["worker"] });
    },
  });

  const deleteWorkerMutation = useMutation<
    void,
    AxiosError,
    string,
    WorkerMutationContext
  >({
    mutationFn: deleteWorkersRequest,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["worker"] });

      const previousWorkers =
        queryClient.getQueryData<Worker[]>(["worker"]) || [];

      queryClient.setQueryData<Worker[]>(["worker"], (old = []) =>
        old.filter((worker) => worker.id !== id)
      );

      return { previousWorkers };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["worker"], context?.previousWorkers);
      toast.error(err.message);
      console.log(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["worker"] });
    },
  });

  return {
    workerQuery,
    workerById,

    createWorker: createWorkerMutation.mutateAsync,
    updateWorker: updateWorkerMutation.mutateAsync,
    deleteWorker: deleteWorkerMutation.mutateAsync,

    isCreating: createWorkerMutation.isPending,
    isUpdating: updateWorkerMutation.isPending,
    isDeleting: deleteWorkerMutation.isPending,

    createError: createWorkerMutation.error,
    updateError: updateWorkerMutation.error,
    deleteError: deleteWorkerMutation.error,

    resetCreateError: createWorkerMutation.reset,
    resetUpdateError: updateWorkerMutation.reset,
    resetDeleteError: deleteWorkerMutation.reset,
  };
}
