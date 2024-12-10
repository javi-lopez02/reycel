interface UserLogin {
  email: string;
  password: string;
}

interface User {
  usermane: string;
  useId: string;
  emial: string;
  userRole: "USER" | "MODERADOR" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  errors: Array<string>;
  loading: boolean;
  signIn: (value: UserLogin) => Promise<void>;
  logout: () => void;
}
