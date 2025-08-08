import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DropdownComp() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrency = () => {
    navigate("/currency");
    setIsOpen(false);
  };

  const handlePayments = () => {
    navigate("/payments/new");
    setIsOpen(false);
  };

  return (
    <>
      <Popover isOpen={isOpen}
        onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <button
            type="button"
            data-dropdown-toggle="apps-dropdown"
            className="p-2 text-gray-500 rounded-lg hover:text-primary-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 "
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0" >
          <div className="block py-2 px-4 min-w-full rounded-xl text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            Opciones
          </div>
          <div className="grid grid-cols-2 gap-4 p-2">
            <div
              className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              onClick={handleCurrency}
            >
              <svg
                className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 11 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"
                />
              </svg>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Monedas
              </div>
            </div>
            <div
              onClick={handlePayments}
              className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
            >
              <svg
                className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M7 11H5v1h2v-1Zm4 3H9v1h2v-1Zm-4 0H5v1h2v-1ZM5 5V.13a2.98 2.98 0 0 0-1.293.749L.88 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM13 16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6Zm-1-8H9a1 1 0 0 1 0-2h3a1 1 0 1 1 0 2Zm0-3H9a1 1 0 0 1 0-2h3a1 1 0 1 1 0 2Z" />
                <path d="M11 11H9v1h2v-1Z" />
              </svg>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Tarjetas
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
