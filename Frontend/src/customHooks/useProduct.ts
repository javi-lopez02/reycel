import { useInfiniteQuery } from "@tanstack/react-query";
import { FiltersType, Products, SortOption } from "../types.d";
import { searchPproductRequest } from "../services/product";

const searchPproduct = async (
  query: string,
  page: number,
  filters: FiltersType,
  sortParams: SortOption[]
): Promise<{ products: Products[]; nextCursor?: number }> => {
  const response = await searchPproductRequest(
    query,
    page,
    filters,
    sortParams
  );

  return {
    products: response.data.data,
    nextCursor: response.data.meta.totalPages > page ? page + 1 : undefined,
  };
};

export const useProduct = (
  querySearch: string,
  filters: FiltersType,
  sortParams: SortOption[]
) => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ nextCursor?: number; products: Products[] }>({
      queryKey: ["porducts", querySearch, filters, sortParams],
      queryFn: ({ pageParam }) =>
        searchPproduct(querySearch, pageParam as number, filters, sortParams),
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    products: data?.pages.flatMap((page) => page.products) ?? [],
    hasNextPage,
  };
};
