import { useEffect, useState } from "react";
import { BiParty } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { Spinner } from "@heroui/spinner";
import { toast } from "sonner";
import { useUserStore } from "../../store/useUserStore";

function VerifyUser() {
  const navigate = useNavigate();
  const [queryToken] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "error";
  });

  const { confirmEmail } = useAuth();
    const { errors, isAuth, loading } = useUserStore();
  

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    }
  }, [errors]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleConfirmEmail = () => {
    confirmEmail(queryToken).then(() => {
      navigate("/verifyUser");
    });
  };

  console.log(queryToken);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <BiParty className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Registro Exitoso!
        </h1>
        <p className="text-gray-600 mb-8">
          Tu cuenta ha sido creada correctamente. Ahora puedes comenzar a
          explorar nuestra plataforma.
        </p>
        <button
          onClick={handleConfirmEmail}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
        >
          Ir al inicio
          {loading && <Spinner />}
          {!loading && <FaArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

export default VerifyUser;
