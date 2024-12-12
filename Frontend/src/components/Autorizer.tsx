import { useDisclosure } from "@nextui-org/react";
import AuthUser from "../pages/auth/AuthUser";

export default function Autorizer() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleLogin = () => onOpen();
  const handleRegister = () => onOpen();

  

  return (
    <div className="mx-auto max-w-7xl px-6 mt-28 lg:px-8">
      <div className="relative isolate overflow-hidden bg-blue-500 px-6 py-24 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-24 xl:py-32">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Tu carrito aún esta vacío
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          Inicia sesion en tu cuenta o registate para comenzar a comprar
        </p>

        <div className="mx-auto mt-10 flex items-center justify-center max-w-md gap-x-4">
          <button
            onClick={handleLogin}
            className="flex-none rounded-md bg-white text-gray-900 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Iniciar Sesión
          </button>

          <button
            onClick={handleRegister}
            className="flex-none rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Registrarse
          </button>
        </div>

        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6"></stop>
              <stop offset="1" stopColor="#7ED321" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <AuthUser isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}></AuthUser>
    </div>
  );
}
