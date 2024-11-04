
export type User = {
  username?: string,
  userId?: number;
  usermane?: string;
  status?: boolean;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  errors: Array<string>;
  signIn: (value: User) => void;
  signUp: (value: User) => void;
  logout: () => void;
};