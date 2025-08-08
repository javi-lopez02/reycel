import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Category, CreateCategoryProps } from "../../type";

import { toast } from "sonner";
import {
  categoryRequest,
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoryByIdRequest,
  updateCategoryRequest,
} from "../services/category";

type CategoryMutationContext = {
  previousCategorys?: Category[];
  previousCategory?: Category;
};

export const useCategory = () => {
  const queryClient = useQueryClient();

  const categoryQuery = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: categoryRequest,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const categoryById = (id: string | undefined) => {
    const isEditMode = Boolean(id);
    return useQuery({
      queryKey: ["category", id], // La clave de consulta incluye el ID
      queryFn: () => getCategoryByIdRequest(id!),
      enabled: isEditMode, // Solo ejecuta la consulta si itemId existe
    });
  };

  const createCategoryMutation = useMutation<
    Category,
    AxiosError,
    Omit<CreateCategoryProps, "id">,
    CategoryMutationContext
  >({
    mutationFn: createCategoryRequest,
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries({ queryKey: ["category"] });

      const previousCategorys =
        queryClient.getQueryData<Category[]>(["category"]) || [];

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<Category[]>(["category"], (old = []) => [
        ...old,
        { ...newCategory, id: tempId, isPending: true },
      ]);

      return { previousCategorys };
    },
    onError: (err, newCategory, context) => {
      queryClient.setQueryData(["category"], context?.previousCategorys);
      console.log(newCategory);
      toast.error(err.message);
    },
    onSuccess: (createdCategory) => {
      queryClient.setQueryData<Category[]>(["category"], (old = []) =>
        old.map((category) =>
          category.id === `temp-${createdCategory.id}`
            ? createdCategory
            : category
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  const updateCategoryMutation = useMutation<
    Category,
    AxiosError,
    CreateCategoryProps,
    CategoryMutationContext
  >({
    mutationFn: updateCategoryRequest,
    onMutate: async (updatedCategory) => {
      await queryClient.cancelQueries({ queryKey: ["category"] });
      await queryClient.cancelQueries({
        queryKey: ["category", updatedCategory.id],
      });

      const previousCategorys =
        queryClient.getQueryData<Category[]>(["category"]) || [];

      const previousCategory = queryClient.getQueryData<Category>([
        "category",
        updatedCategory.id,
      ]);

      queryClient.setQueryData<Category[]>(["category"], (old = []) =>
        old.map((category) =>
          category.id === updatedCategory.id
            ? { ...category, ...updatedCategory, isPending: true }
            : category
        )
      );
      queryClient.setQueryData(
        ["category", updatedCategory.id],
        updatedCategory
      );

      return { previousCategorys, previousCategory };
    },
    onError: (err, updatedCategory, context) => {
      if (context?.previousCategory) {
        queryClient.setQueryData(["category"], context.previousCategorys);
      }
      if (context?.previousCategory) {
        queryClient.setQueryData(
          ["category", updatedCategory.id],
          context.previousCategory
        );
      }
      toast.error(err.message);
    },
    onSettled: (updatedCategory) => {
      if (updatedCategory) {
        queryClient.invalidateQueries({
          queryKey: ["category", updatedCategory.id],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  const deleteCategoryMutation = useMutation<
    void,
    AxiosError,
    string,
    CategoryMutationContext
  >({
    mutationFn: deleteCategoryRequest,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["category"] });

      const previousCategorys =
        queryClient.getQueryData<Category[]>(["category"]) || [];

      queryClient.setQueryData<Category[]>(["category"], (old = []) =>
        old.filter((category) => category.id !== id)
      );

      return { previousCategorys };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["category"], context?.previousCategorys);
      toast.error(err.message);
      console.log(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  return {
    categoryQuery,
    categoryById,

    createCategory: createCategoryMutation.mutateAsync,
    updateCategory: updateCategoryMutation.mutateAsync,
    deleteCategory: deleteCategoryMutation.mutateAsync,

    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,

    createError: createCategoryMutation.error,
    updateError: updateCategoryMutation.error,
    deleteError: deleteCategoryMutation.error,

    resetCreateError: createCategoryMutation.reset,
    resetUpdateError: updateCategoryMutation.reset,
    resetDeleteError: deleteCategoryMutation.reset,
  };
};
