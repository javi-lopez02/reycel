import { create } from "zustand";
import { User } from "../types";

type Store = {
  user: User | null;
  isAuth: boolean;
  errors: Array<string>;
  loading: boolean;
  setUser: (user: User | null) => void;
  setIsAuth: (isAuth: boolean) => void;
  setErrors: (errors: Array<string>) => void;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create<Store>()((set) => ({
  user: null,
  isAuth: false,
  errors: [],
  loading: true,
  setUser: (user) => set({ user: user }),
  setIsAuth: (isAuth) => set({ isAuth: isAuth }),
  setErrors: (errors) => set({ errors: errors }),
  setLoading: (loading) => set({ loading: loading }),
}));
