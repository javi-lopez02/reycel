
export type User = {
  username?: string;
  userId?: number;
  password?: string;
  status?: boolean;
  email: string;
};

export type Products = {
  id: string;
  imagen: string;
  name: string;
  price: number;
  description: string;
};

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  errors: Array<string>;
  signIn: ({ email, password }: { email: string; password: string }) => void;
  signUp: ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => void;
  logout: () => void;
};

export type ProductContextType = {
  products: Products[] | [];
  currentPage: number;
  loading: boolean
  errorSerch: Array<string> |  null
  isNextPage: boolean;
  error: Array<string> | null;
  setCurrentPage: (value: number) => void;
  setIsNextPage: (vaule: boolean) => void;
  setErrorSearch: (value: Array<string> | null) => void;
  searchProduct: (query?: string) => void;
};