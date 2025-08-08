import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  CreateProductProps,
  MetaData,
  Products,
  PropsGetTable,
} from "../../type";

import { toast } from "sonner";
import {
  createProductRequest,
  deleteProductRequest,
  getProductByIdRequest,
  getProductRequest,
  updateProductRequest,
} from "../services/product";

type ProductMutationContext = {
  previousProducts?: Products[];
  previousProduct?: Products;
};

const getProduct = async (
  { filterValue, sortDescriptor, rowsPerPage }: Omit<PropsGetTable, "page">,
  page: number,
  sedeId?: string | undefined
): Promise<{
  products: Products[];
  nextCursor?: number;
  previousCursor?: number;
  metaData: MetaData;
}> => {
  const response = await getProductRequest({
    filterValue,
    sortDescriptor,
    rowsPerPage,
    page,
  }, sedeId);

  return {
    products: response.products,
    metaData: response.metaData,
    nextCursor: response.nextCursor,
    previousCursor: response.previousCursor,
  };
};

export const useProduct = () => {
  const queryClient = useQueryClient();

  const useProductsQuery = ({
    filterValue,
    sortDescriptor,
    rowsPerPage,
    page,
  }: PropsGetTable) => {
    return useQuery({
      queryKey: ["product", { page, filterValue, sortDescriptor, rowsPerPage }],
      queryFn: () =>
        getProduct(
          {
            filterValue,
            sortDescriptor,
            rowsPerPage,
          },
          page as number
        ),
      staleTime: 1000 * 60 * 2,
      retry: 2,
    });
  };

  const productInfiniteQuery = ({
    filterValue,
    sedeId,
  }: {
    filterValue: string;
    sedeId: string | undefined;
  }) => {
    return useInfiniteQuery<{
      nextCursor?: number;
      products: Products[];
      metaData: MetaData;
    }>({
      queryKey: ["product", filterValue],
      queryFn: ({ pageParam: page }) =>
        getProduct(
          {
            filterValue,
            rowsPerPage: 15,
            sortDescriptor: undefined,
          },
          page as number,
          sedeId
        ),
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
  };

  const productById = (id: string | undefined) => {
    const isEditMode = Boolean(id);
    return useQuery({
      queryKey: ["product", id], // La clave de consulta incluye el ID
      queryFn: () => getProductByIdRequest(id!),
      enabled: isEditMode, // Solo ejecuta la consulta si itemId existe
    });
  };

  const createProductMutation = useMutation<
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
  });

  return {
    productInfiniteQuery,
    productById,
    useProductsQuery,

    createProduct: createProductMutation.mutateAsync,
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
    resetDeleteError: deleteProductMutation.reset,
  };
};
