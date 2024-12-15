import axios from "./axios";


export const productRequest = () => {
  return axios.get(
    `/products/search?pageSize=1000000`
  );
};