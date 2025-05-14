import {
  createContext,
  useContext,
  useEffect,
  PropsWithChildren,
  FC,
} from "react";
import {
  confirmEmailRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  verifyTokenRequest,
} from "../services/auth";
import Cookies from "js-cookie";
import { type UserAuth } from "../types.d";
import axios, { AxiosError } from "axios";
import { io } from "socket.io-client";
import { API_URL } from "../conf";
import { useNotificationStore } from "../store/useNotificationStore";
import { useUserStore } from "../store/useUserStore";
import { toast } from "sonner";

interface AuthContextType {
  confirmEmail: (values: string) => Promise<void>;
  signIn: (values: UserAuth) => Promise<void>;
  signUp: (values: UserAuth) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    errors,
    setErrors,
    setIsAuth,
    setLoading,
    setUser,
  } = useUserStore();

  const { setNotifications } = useNotificationStore();

  const signIn = async (values: UserAuth) => {
    try {
      const res = await LoginRequest(values);
      setUser(res.data);
      setNotifications(res.data.notifications);
      setIsAuth(true);

      const socket = io(API_URL);
      socket.emit("usuario-conectado", res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          setErrors(axiosError.response.data as Array<string>);
        } else if (axiosError.request) {
        }
      }
    }
  };

  const signUp = async (values: UserAuth) => {
    try {
      await RegisterRequest(values);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          setErrors(axiosError.response.data as Array<string>);
        } else if (axiosError.request) {
          toast.error("No se recibió respuesta:", axiosError.request);
        }
      } else {
        toast.error("Error desconocido:");
      }
    }
  };

  const confirmEmail = async (values: string) => {
    setLoading(true);
    try {
      try {
        const res = await confirmEmailRequest(values);
        setUser(res.data);
        setNotifications(res.data.notifications);
        setIsAuth(true);

        const socket = io(API_URL);
        socket.emit("usuario-conectado", res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            setErrors(axiosError.response.data as Array<string>);
          } else if (axiosError.request) {
            toast.error("No se recibió respuesta:", axiosError.request);
          }
        } else {
          toast.error("Error desconocido:");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await LogoutRequest();
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      toast.error("error");
      //setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const time = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const { token } = Cookies.get();
      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) return setIsAuth(false);
        setIsAuth(true);
        setUser(res.data);
        setNotifications(res.data.notifications);
        setLoading(false);

        const socket = io(API_URL);
        socket.emit("usuario-conectado", res.data);
      } catch (error) {
        toast.error("error");
        setIsAuth(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const value = {
    confirmEmail,
    signIn,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };
