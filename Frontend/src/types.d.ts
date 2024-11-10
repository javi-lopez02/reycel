export type User = {
  username?: string;
  userId?: number;
  password?: string;
  status?: boolean;
  email: string;
};

export type Products ={
  id: string,
  imagen: string
  name: string
  price: number
  description: string
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
