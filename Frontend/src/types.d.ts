export type User = {
  username?: string;
  userId: string;
  password?: string;
  status?: boolean;
  email: string;
};

export type Specs = {
  id: string;
  ram: number;
  storage: number;
  battery: number | null;
  mpxCameraFront: number | null;
  mpxCameraBack: number | null;
};

export interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imagen: string;
  color?: string;
  ram: number;
  storage: number;
  battery?: number;
  mpxCameraFront?: number;
  mpxCameraBack?: number;
  inventoryCount: number;
}

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

export interface Category {
  id: string;
  name: string;
}

export interface FiltersType {
  minPrice?: string;
  maxPrice?: string;
  categoriy?: string;
  rating?: string;
  color?: string;
}

export type SortOption = {
  field: "createdAt" | "price" | "rating"; // Campos permitidos
  order: "asc" | "desc"; // Órdenes permitidas
};

export type ProductContextType = {
  products: Products[] | [];
  currentPage: number;
  loading: boolean;
  categories: Array<Category>;
  errorSerch: Array<string> | null;
  isNextPage: boolean;
  error: Array<string> | null;
  filters: FiltersType;
  setSortParmas: (value: Array<SortOption>) => void;
  setFilters: (value: FiltersType) => void;
  setCurrentPage: (value: number) => void;
  setIsNextPage: (vaule: boolean) => void;
  setErrorSearch: (value: Array<string> | null) => void;
  setQuerySeach: (value: string) => void;
};
