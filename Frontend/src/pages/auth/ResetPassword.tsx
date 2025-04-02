import { useState } from "react";
import { TbBuildingBridge2 } from "react-icons/tb";
import { requestPasswordReset } from "../../services/auth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "") {
      toast.error("El correo electrónico es requerido");
      return;
    }
    setIsLoading(true);
    requestPasswordReset(email)
      .then(() => {
        toast.success("Instrucciones enviadas a tu correo electrónico");
        setMessage(
          "Si existe una cuenta asociada a este correo, recibirás un enlace para restablecer tu contraseña."
        );
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data[0]);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setEmail("");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-10">
          <TbBuildingBridge2 className="w-16 h-16 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Restablecer Contraseña
          </h1>
          <p className="text-gray-600 text-center max-w-md mb-8">
            Ingresa tu correo electrónico y te enviaremos instrucciones para
            crear una nueva contraseña. Por tu seguridad, el enlace expirará en
            2 horas.
          </p>
        </div>
        {message ? (
          <div className="text-center bg-blue-50 text-blue-800 p-6 rounded">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Enviar Instrucciones
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Volver a Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
