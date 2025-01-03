export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  username: string;
  userId: string;
  email: string;
  userRole: "USER" | "MODERADOR" | "ADMIN";
  image?: string;
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
  email: string;
  image: string;
  status: boolean;
  Sede: Sede;
  role: "USER" | "MODERADOR" | "ADMIN";
  createdAt: string;
  _count: Count;
}

interface Sede {
  direction: string;
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

export interface Order {
  createdAt: string;
  id: string;
  totalAmount: number;
  pending: boolean;
  user: Users;
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
  User: UserPayment;
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
  email: string;
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
}
