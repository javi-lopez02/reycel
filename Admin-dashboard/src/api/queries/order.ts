import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Order, PropsGetTable } from "../../type";

import { toast } from "sonner";

import { getOrderItemsRequest, getOrderRequest } from "../services/order";

type OrderMutationContext = {
  previousOrders?: Order[];
  previousOrder?: Order;
};

export const useOrderQuery = () => {
  const queryClient = useQueryClient();

  const orderQuery = ({
    filterValue,
    sortDescriptor,
    rowsPerPage,
    page,
  }: PropsGetTable) => {
    return useQuery({
      queryKey: ["order", { page, filterValue, sortDescriptor, rowsPerPage }],
      queryFn: () =>
        getOrderRequest({
          filterValue,
          sortDescriptor,
          rowsPerPage,
          page,
        }),
      staleTime: 1000 * 60 * 2,
      retry: 2,
    });
  };

  const orderItemsQuery = (id: string | undefined) => {
    const isEditMode = Boolean(id);
    return useQuery({
      queryKey: ["order", { id }], // La clave de consulta incluye el ID
      queryFn: () => getOrderItemsRequest(id!),
      enabled: isEditMode, // Solo ejecuta la consulta si itemId existe
      staleTime: 1000 * 5 ,
      retry: 2,
    });
  };

  /* const createOrderMutation = useMutation<
    Products,
    AxiosError,
    Omit<CreateProductProps, "id">,
    ProductMutationContext
  >({
    mutationFn: createProductRequest,
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ["product"] });

      const previousProducts =
        queryClient.getQueryData<Products[]>(["product"]) || [];

      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<Products[]>(["product"], (old = []) => [
        ...old,
        { ...newProduct, id: tempId, isPending: true },
      ]);

      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      queryClient.setQueryData(["product"], context?.previousProducts);
      console.log(newProduct);
      toast.error(err.message);
    },
    onSuccess: (createdProduct) => {
      queryClient.setQueryData<Products[]>(["product"], (old = []) =>
        old.map((product) =>
          product.id === `temp-${createdProduct.id}` ? createdProduct : product
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  const updateProductMutation = useMutation<
    Products,
    AxiosError,
    CreateProductProps,
    ProductMutationContext
  >({
    mutationFn: updateProductRequest,
    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: ["product"] });
      await queryClient.cancelQueries({
        queryKey: ["product", updatedProduct.id],
      });

      const previousProducts =
        queryClient.getQueryData<Products[]>(["product"]) || [];

      const previousProduct = queryClient.getQueryData<Products>([
        "product",
        updatedProduct.id,
      ]);

      queryClient.setQueryData<Products[]>(["product"], (old = []) =>
        old.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct, isPending: true }
            : product
        )
      );
      queryClient.setQueryData(["product", updatedProduct.id], updatedProduct);

      return { previousProducts, previousProduct };
    },
    onError: (err, updatedProduct, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(["product"], context.previousProducts);
      }
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ["product", updatedProduct.id],
          context.previousProduct
        );
      }
      toast.error(err.message);
    },
    onSettled: (updatedProduct) => {
      if (updatedProduct) {
        queryClient.invalidateQueries({
          queryKey: ["product", updatedProduct.id],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  const deleteProductMutation = useMutation<
    void,
    AxiosError,
    string,
    ProductMutationContext
  >({
    mutationFn: deleteProductRequest,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["product"] });

      const previousProducts =
        queryClient.getQueryData<Products[]>(["product"]) || [];

      queryClient.setQueryData<Products[]>(["product"], (old = []) =>
        old.filter((product) => product.id !== id)
      );

      return { previousProducts };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["product"], context?.previousProducts);
      toast.error(err.message);
      console.log(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  }); */

  return {
    orderQuery,
    orderItemsQuery,

    /* createProduct: createProductMutation.mutateAsync,
    updateProduct: updateProductMutation.mutateAsync,
    deleteProduct: deleteProductMutation.mutateAsync,

    isCreating: createProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
    isDeleting: deleteProductMutation.isPending,

    createError: createProductMutation.error,
    updateError: updateProductMutation.error,
    deleteError: deleteProductMutation.error,

    resetCreateError: createProductMutation.reset,
    resetUpdateError: updateProductMutation.reset,
    resetDeleteError: deleteProductMutation.reset, */
  };
};
