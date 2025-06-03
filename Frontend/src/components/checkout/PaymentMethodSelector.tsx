import React from "react";
import Tooltip from "./Tooltip";
import { Chip, Snippet } from "@heroui/react";

interface PaymentMethod {
  id: string;
  cardImage: string;
  cardNumber: null;
  createdAt: Date;
  paymentOptions: string;
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onSelectMethod: (methodId: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  methods,
  selectedMethod,
  onSelectMethod,
}) => {
  return (
    <div className="mb-6 px-2 ">
      <div className="flex items-center mb-2">
        <h3 className="text-md font-medium text-gray-700">Método de Pago</h3>
        <Tooltip content="Seleccione su método de pago preferido. La imagen del método se mostrará al seleccionarlo." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className={`relative flex flex-col gap-2 rounded-lg p-2 mt-2 cursor-pointer transition-all duration-200 overflow-hidden ${
              selectedMethod === method.id
                ? "ring-2 ring-blue-500"
                : "ring-1 ring-gray-200"
            }`}
            onClick={() => onSelectMethod(method.id)}
            style={{
              backgroundImage: `url(${method.cardImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay with blur effect */}
            <div
              className={`absolute inset-0 transition-all duration-200 ${
                selectedMethod === method.id
                  ? "backdrop-blur-xs bg-white/30"
                  : "backdrop-blur-sm bg-white/20"
              }`}
            />

            <div className="flex items-left justify-center">
              <input
                type="radio"
                name="payment-method"
                id={`method-${method.id}`}
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => onSelectMethod(method.id)}
                className="relative z-10 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />

              <label
                htmlFor={`method-${method.id}`}
                className="relative z-10 ml-3 flex flex-1 cursor-pointer"
              >
                <div className="flex-1 justify-center">
                  <Chip color="default" variant="flat" size="sm" className="font-bold text-black">
                    {method.paymentOptions}
                  </Chip>
                </div>
              </label>
            </div>
            <Snippet className="w-full font-bold text-black" size="sm">
              {method.cardNumber}
            </Snippet>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
