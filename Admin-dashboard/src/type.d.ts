export interface UserLogin {
  userName: string;
  password: string;
}

export interface Workers {
  id: string;
  baseUser: BaseUser;
}

export interface BaseUser {
  id: string;
  username: string;
  image: string;
  email: string;
  status: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  image: string;
  status: boolean;
  orders: { id: string; pending: boolean }[];
  orderCount: number;
  createdAt: string;
  sede: string
}

export interface Worker {
  id: string;
  username: string;
  email: string;
  image: string;
  status: boolean;
  orderCount: number;
  createdAt: string;
  salary: number;
  role: "OWNER" | "MODERATOR";
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
  image: string;
  status: boolean;
  Sede: Sede;
  role: "USER" | "MODERADOR" | "ADMIN";
  createdAt: string;
  _count: Count;
}

interface Sede {
  id: string;
  image: string;
  phone: string;
  direction: string;
  workers: Workers[];
}
interface Count {
  orders: number;
}

export interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imagen: string;
  createdAt: string;
  inventoryCount: number;
  category: Category;
}
export interface Category {
  id: string;
  name: string;
  createdAt: string;
  _count: {
    products: number;
  };
}

type Client = {
  baseUser: BaseUser;
};

type Admin = {
  baseUser: BaseUser;
};

export interface Order {
  createdAt: string;
  id: string;
  totalAmount: number;
  pending: boolean;
  admin: Admin;
  client: Client;
  _count: {
    orderItems: number;
  };
}

export interface PaymentMethod {
  id: string;
  cardImage: string;
  cardNumber?: string;
  createdAt: string;
  _count: {
    payment: number;
  };
  paymentOptions: PaymentOptions;
}

export type PaymentOptions =
  | "TRANSFER_USD"
  | "TRANSFER_CUP"
  | "CASH"
  | "QVAPAY"
  | "ZELLE";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentStatus: string;
  createdAt: string;
  paymentMethodId: string;
  userId: string;
  client: {
    baseUser: {
      username: string;
      image: string;
      email: string;
    };
  };
  admin: {
    baseUser: {
      username: string;
      image: string;
      email: string;
    };
  };
  PaymentMethod: PaymentMethod;
  order: {
    _count: {
      orderItems: number;
    };
  };
}

export interface UserPayment {
  username: string;
  image: string;
  role: string;
}

export interface OrderItem {
  id: string;
  createdAt: string;
  price: number;
  quantity: number;
  product: ProductOrder;
}

export interface ProductOrder {
  imagen: string;
  name: string;
  ratingAverage: number;
  inventaryCount: number;
}

export interface Analytics {
  dataProductsByMonth: DataSByMonth[];
  dataUsersByMonth: DataSByMonth[];
  dataCategoriesByMonth: DataSByMonth[];
  growthProducts: number;
  growthUsers: number;
  growthCategories: number;
  totalProduct: number;
  totalUser: number;
  totalCategory: number;
}

export interface DataSByMonth {
  month: string;
  total: string;
}

export interface Growth {
  month: string;
  total: string;
  growth: string;
}

export interface PaymentAnalytics {
  date: string;
  total: number;
}

export interface AddPaymentMethodProps {
  id?: string;
  image: string;
  numberCard: string;
  selected: PaymentOptions;
}