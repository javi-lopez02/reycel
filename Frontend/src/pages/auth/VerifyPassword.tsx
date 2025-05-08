import { useState } from "react";
import { TbBuildingBridge2, TbEye, TbEyeOff } from "react-icons/tb";
import { resetPassword } from "../../services/auth";
import { toast } from "sonner";

function VerifyPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [queryToken] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("token") ?? "error";
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    resetPassword(queryToken, password)
      .then(() => {
        toast.success("Tu contraseña ha sido actualizada correctamente");
        setMessage("Tu contraseña ha sido actualizada correctamente");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data[0]);
          setMessage(error.response.data[0]);
        } else {
          toast.error("Error de conexión");
          setMessage("Error de conexión");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-10">
          <TbBuildingBridge2 className="w-16 h-16 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Crear Nueva Contraseña
          </h1>
          <p className="text-gray-600 text-center max-w-md mb-8">
            Por favor ingresa tu nueva contraseña. Asegúrate de que sea segura y
            fácil de recordar.
          </p>
        </div>

        {message && (
          <div
            className={`text-center p-6 rounded mb-6 ${
              message.includes("no coinciden")
                ? "bg-red-50 text-red-800"
                : "bg-green-50 text-green-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <TbEyeOff size={20} /> : <TbEye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <TbEyeOff size={20} />
                ) : (
                  <TbEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Guardar Nueva Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyPassword;
