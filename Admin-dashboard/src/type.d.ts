export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  usermane: string;
  useId: string;
  emial: string;
  userRole: "USER" | "MODERADOR" | "ADMIN";
}

export interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  errors: Array<string>;
  loading: boolean;
  signIn: (value: UserLogin) => Promise<void>;
  logout: () => void;
}

export interface Users {
  id: string;
  username: string;
  emial: string;
  image?: string;
  status: boolean;
  role: "USER" | "MODERADOR" | "ADMIN";
  createdAt: Date;
  _count: {
    orders: number;
  };
}

export interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  ratingAverage: number;
  imagen: string;
  color?: string;
  ram?: number;
  storage?: number;
  battery?: number;
  createdAt: string,
  mpxCameraFront?: number;
  mpxCameraBack?: number;
  inventoryCount: number;
  category: Category
}
export interface Category {
  id: string;
  name: string;
}