import axios from "axios";
import { FASTAPI_URL } from "../conf";

const instance = axios.create({
  baseURL: `${FASTAPI_URL}`,
  withCredentials: true,
});

export default instance;