import {
  CreateProductProps,
  MetaData,
  Products,
  PropsGetTable,
} from "../../type";
import axios from "./axios";

export const getProductRequest = async ({
  filterValue,
  sortDescriptor,
  rowsPerPage,
  page,
}: PropsGetTable, sedeId?: string | undefined): Promise<{
  products: Products[];
  nextCursor?: number;
  previousCursor?: number;
  metaData: MetaData;
}> => {
  const jsonString = JSON.stringify(sortDescriptor);
  const encodedParams = `${encodeURIComponent(jsonString)}`;
  const res = await axios.get(
    `/product?filterValue=${filterValue}&sortDescriptor=${encodedParams}&rowsPerPage=${rowsPerPage}&page=${page}&sedeId=${sedeId}`
  );
  return {
    products: res.data.data,
    metaData: res.data.meta,
    previousCursor: res.data.meta.page > 1 ? res.data.meta.page - 1 : undefined,
    nextCursor: res.data.meta.totalPages > page ? page + 1 : undefined,
  };
};

export const getProductByIdRequest = async (id: string): Promise<Products> => {
  const res = await axios.get(`/products?p=${id}`);
  const product = res.data.data;
  return product;
};

export const createProductRequest = async (
  product: CreateProductProps
): Promise<Products> => {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    // Si el valor es undefined o null, lo saltamos
    if (value === undefined || value === null) return;
    // Si es un array (por ejemplo, para múltiples imágenes o tags)
    if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        formData.append(`${key}[${idx}]`, item);
      });
    } else {
      formData.append(key, value);
    }
  });
  const res = await axios.post(`/product`, formData);
  const newProduct = res.data.data;
  return newProduct;
};

export const updateProductRequest = async (
  productUpdated: CreateProductProps
): Promise<Products> => {
  const formData = new FormData();
  Object.entries(productUpdated).forEach(([key, value]) => {
    // Si el valor es undefined o null, lo saltamos
    if (value === undefined || value === null) return;
    // Si es un array (por ejemplo, para múltiples imágenes o tags)
    if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        formData.append(`${key}[${idx}]`, item);
      });
    } else {
      formData.append(key, value);
    }
  });
  const res = await axios.put(`/product/${productUpdated.id}`, formData);
  const updateProduct = res.data.data;
  return updateProduct;
};

export const deleteProductRequest = async (id: string): Promise<void> => {
  return await axios.delete(`/product/${id}`);
};
