import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
  FC,
} from "react";
import {
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  verifyTokenRequest,
} from "../services/auth";
import Cookies from "js-cookie";
import { User, AuthContextType } from "../types.d";



export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signIn = async (values: User) => {
    try {
      const res = await LoginRequest(values);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      //setErrors(error.response.data);
    }
  };

  const signUp = async (values: User) => {
    try {
      console.log(values);
      const res = await RegisterRequest(values);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      //setErrors(error.response.data);
    }
  };

  const logout = async () => {
    try {
      await LogoutRequest();
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.log("error");
      console.log(error);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuth(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        loading,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };
