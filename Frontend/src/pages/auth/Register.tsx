import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useUserStore } from "../../store/useUserStore";

export default function Register() {
  const [error, setError] = useState<Array<string>>([]);
  const { signUp } = useAuth();
  const { errors, isAuth } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (error.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(() => {
    setError(errors);
  }, [errors]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const inputUser = elements.namedItem("user") as RadioNodeList;
    const inputEmail = elements.namedItem("email") as RadioNodeList;

    const inputPassword = elements.namedItem("password") as RadioNodeList;
    const inputPassword_confirm = elements.namedItem(
      "confirm-password"
    ) as RadioNodeList;

    if (!inputUser.value) {
      setError([...error, "User name is required"]);
      return;
    }

    if (!inputEmail.value) {
      setError([...error, "Email name is required"]);
      return;
    }

    if (!inputPassword.value) {
      setError([...error, "Password is required"]);
      return;
    }

    if (
      !inputPassword.value ||
      inputPassword.value !== inputPassword_confirm.value
    ) {
      setError([...error, "Password does not match"]);
      return;
    }

    await signUp({
      password: inputPassword.value,
      username: inputUser.value,
    });

    inputUser.value = "";
    inputEmail.value = "";
    inputPassword_confirm.value = "";
    inputPassword.value = "";
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://img.icons8.com/ios-filled/50/fairytale.png"
            alt="logo"
          />
          Reycel
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Regístrate
            </h1>
            {error.length > 0 &&
              error.map((err) => {
                return (
                  <div
                    className="bg-red-400 p-2 rounded-lg mx-auto w-4/5 flex items-center justify-center"
                    key={err}
                  >
                    <h1 className="text-white font-bold">{err}</h1>
                  </div>
                );
              })}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Usuario
                </label>
                <input
                  type="text"
                  name="user"
                  id="user"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nombre de Usuario ..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email ..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirma tu Contraseña
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  required
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Regístrate
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Ya tienes cuenta?
                <Link
                  to="/login"
                  className="font-medium ml-3 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Entrar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
