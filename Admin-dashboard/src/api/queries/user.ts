import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User } from "../../type";

import { toast } from "sonner";

import {
  deleteUsersRequest,
  getUsersByIdRequest,
  getUsersRequest,
} from "../services/user";

type UserMutationContext = {
  previousUsers?: User[];
  previousUser?: User;
};

export const useUserQuery = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: getUsersRequest,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const userById = (id: string | undefined) => {
    const isEditMode = Boolean(id);
    return useQuery({
      queryKey: ["user", id],
      queryFn: () => getUsersByIdRequest(id!),
      enabled: isEditMode,
    });
  };

  const deleteUserMutation = useMutation<
    void,
    AxiosError,
    string,
    UserMutationContext
  >({
    mutationFn: deleteUsersRequest,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      const previousUsers = queryClient.getQueryData<User[]>(["user"]) || [];

      queryClient.setQueryData<User[]>(["user"], (old = []) =>
        old.filter((user) => user.userId !== id)
      );

      return { previousUsers };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["user"], context?.previousUsers);
      toast.error(err.message);
      console.log(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    userQuery,
    userById,

    deleteUser: deleteUserMutation.mutateAsync,

    isDeleting: deleteUserMutation.isPending,

    deleteError: deleteUserMutation.error,

    DeleteError: deleteUserMutation.reset,
  };
};
