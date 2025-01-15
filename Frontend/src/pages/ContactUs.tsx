import {
  FaWhatsapp,
  FaTelegram,
  FaPhoneVolume,
  FaEnvelopeOpenText,
} from "react-icons/fa6";
import Card from "../components/ContactUs/Card";
import { useAuth } from "../context/auth.context";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";

export default function ContactUs() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const name = data["name"] as string;
    const user = data["user"] as string;
    const phone = data["phone"] as string;
    const message = data["message"] as string;

    // Validaciones
    if (!name) {
      toast.error("El nombre es requerido");
      setLoading(false);
      return;
    }
    if (!phone) {
      toast.error("El telefono es requerido");
      setLoading(false);
      return;
    }

    if (!message) {
      toast.error("El mensaje es requerido");
      setLoading(false);
      return;
    }

    const messageWhatsApp = `Nombre: ${name} \n Usuario: ${user} \n Telefeno: ${phone} \n Mensaje: ${message}`;

    const url = `https://wa.me/${5358246718}?text=${messageWhatsApp}`;
    window.open(url, "_blank");
    setLoading(false);
  };

  return (
    <div className="font-[sans-serif] max-w-6xl pt-20 mx-auto relative bg-white rounded-lg py-6">
      <div className="grid lg:grid-cols-3 items-center">
        <div className="grid sm:grid-cols-2 gap-4 z-20 relative lg:left-16 max-lg:px-4">
          <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
            <FaEnvelopeOpenText className="min-w-7 min-h-7 fill-blue-500" />
            <h4 className="text-gray-800 text-base font-bold mt-4">Email</h4>
            <p className="text-sm text-gray-600 mt-2">
              reynierfernandez85{"\n"}@gmail.com
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
            <FaPhoneVolume className="min-w-7 min-h-7 fill-green-500" />
            <h4 className="text-gray-800 text-base font-bold mt-4">
              Haz tu llamada
            </h4>
            <p className="text-sm text-gray-600 mt-2">+53 58246718</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
            <FaTelegram className="min-w-7 min-h-7 fill-blue-500" />
            <h4 className="text-gray-800 text-base font-bold mt-4">Telegram</h4>
            <p className="text-sm text-gray-600 mt-2">+53 58246718</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
            <FaWhatsapp className="min-w-7 min-h-7 fill-green-500" />
            <h4 className="text-gray-800 text-base font-bold mt-4">WhatsApp</h4>
            <p className="text-sm text-gray-600 mt-2">+53 58246718</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-blue-900 rounded-lg sm:p-10 p-4 z-10 max-lg:-order-1 max-lg:mb-8">
          <h2 className="text-3xl text-white text-center font-bold mb-6">
            Contáctanos
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="max-w-md mx-auto space-y-3">
              <input
                name="name"
                type="text"
                placeholder="Nombre"
                className="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
              />
              <input
                name="user"
                value={user?.username}
                type="text"
                placeholder="Usuario"
                className="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
              />
              <input
                name="phone"
                type="text"
                placeholder="No. Telefono"
                className="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
              />
              <textarea
                name="message"
                placeholder="Mensaje"
                rows={6}
                className="w-full bg-gray-100 rounded-lg px-6 resize-none text-sm pt-3 outline-none"
              ></textarea>
              <button
                type="submit"
                className="text-gray-800 w-full relative bg-yellow-400 hover:bg-yellow-500 font-semibold rounded-lg text-sm px-6 py-3 !mt-6"
              >
                {loading && <Spinner />}
                {!loading && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      fill="currentColor"
                      className="mr-2 inline"
                      viewBox="0 0 548.244 548.244"
                    >
                      <path
                        fillRule="evenodd"
                        d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                        clipRule="evenodd"
                        data-original="#000000"
                      />
                    </svg>
                    Enviar Mensaje
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Card />
    </div>
  );
}
