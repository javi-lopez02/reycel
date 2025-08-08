import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Sede, SedeRequest } from "../../type";

import { toast } from "sonner";
import { createSedeRequest, deleteSedeRequest, updateSedeRequest, getSedeIdRequest, getSedesRequest } from "../services/sedes";


type SedeMutationContext = {
  previousSedes?: Sede[];
  previousSede?: Sede;
};

export const useSedeQuery = () => {
  const queryClient = useQueryClient();

  const sedeQuery = useQuery<Sede[]>({
    queryKey: ["sede"],
    queryFn: getSedesRequest,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const sedeById = (id: string | undefined) => {
    const isEditMode = Boolean(id);
    return useQuery({
      queryKey: ["sede", id], // La clave de consulta incluye el ID
      queryFn: () => getSedeIdRequest(id!),
      enabled: isEditMode, // Solo ejecuta la consulta si itemId existe
    });
  };

  const createSedeMutation = useMutation<
    Sede,
    AxiosError,
    Omit<SedeRequest, "id">,
    SedeMutationContext
  >({
    mutationFn: createSedeRequest,
    onMutate: async (newSede) => {
      await queryClient.cancelQueries({ queryKey: ["sede"] });

      const previousSedes =
        queryClient.getQueryData<Sede[]>(["sede"]) || [];

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<Sede[]>(["sede"], (old = []) => [
        ...old,
        { ...newSede, id: tempId, isPending: true,  },
      ]);

      return { previousSedes };
    },
    onError: (err, newSede, context) => {
      queryClient.setQueryData(["sede"], context?.previousSedes);
      console.log(newSede);
      toast.error(err.message);
    },
    onSuccess: (createdSede) => {
      queryClient.setQueryData<Sede[]>(["sede"], (old = []) =>
        old.map((sede) =>
          sede.id === `temp-${createdSede.id}` ? createdSede : sede
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sede"] });
    },
  });

  const updateSedeMutation = useMutation<
    Sede,
    AxiosError,
    SedeRequest,
    SedeMutationContext
  >({
    mutationFn: updateSedeRequest,
    onMutate: async (updatedSede) => {
      await queryClient.cancelQueries({ queryKey: ["sede"] });
      await queryClient.cancelQueries({
        queryKey: ["sede", updatedSede.id],
      });

      const previousSedes =
        queryClient.getQueryData<Sede[]>(["sede"]) || [];

      const previousSede = queryClient.getQueryData<Sede>([
        "sede",
        updatedSede.id,
      ]);

      queryClient.setQueryData<Sede[]>(["sede"], (old = []) =>
        old.map((sede) =>
          sede.id === updatedSede.id
            ? { ...sede, ...updatedSede, isPending: true }
            : sede
        )
      );
      queryClient.setQueryData(["sede", updatedSede.id], updatedSede);

      return { previousSedes, previousSede };
    },
    onError: (err, updatedSede, context) => {
      if (context?.previousSede) {
        queryClient.setQueryData(["sede"], context.previousSedes);
      }
      if (context?.previousSede) {
        queryClient.setQueryData(
          ["sede", updatedSede.id],
          context.previousSede
        );
      }
      toast.error(err.message);
    },
    onSettled: (updatedSede) => {
      if (updatedSede) {
        queryClient.invalidateQueries({
          queryKey: ["sede", updatedSede.id],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["sede"] });
    },
  });

  const deleteSedeMutation = useMutation<
    void,
    AxiosError,
    string,
    SedeMutationContext
  >({
    mutationFn: deleteSedeRequest,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["sede"] });

      const previousSedes =
        queryClient.getQueryData<Sede[]>(["sede"]) || [];

      queryClient.setQueryData<Sede[]>(["sede"], (old = []) =>
        old.filter((sede) => sede.id !== id)
      );

      return { previousSedes };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["sede"], context?.previousSedes);
      toast.error(err.message);
      console.log(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sede"] });
    },
  });

  return {
    sedeQuery,
    sedeById,

    createSede: createSedeMutation.mutateAsync,
    updateSede: updateSedeMutation.mutateAsync,
    deleteSede: deleteSedeMutation.mutateAsync,

    isCreating: createSedeMutation.isPending,
    isUpdating: updateSedeMutation.isPending,
    isDeleting: deleteSedeMutation.isPending,

    createError: createSedeMutation.error,
    updateError: updateSedeMutation.error,
    deleteError: deleteSedeMutation.error,

    resetCreateError: createSedeMutation.reset,
    resetUpdateError: updateSedeMutation.reset,
    resetDeleteError: deleteSedeMutation.reset,
  };
}
