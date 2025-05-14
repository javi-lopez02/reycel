import React, { useEffect, useState } from "react";
import Modal from "../Car/Modal";
import OrderSummary from "./OrderSummary";
import PaymentMethodSelector from "./PaymentMethodSelector";
import AddressSelector, { Municipality } from "./AddressSelector";
import TransferIdInput from "./TransferIdInput";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { RiLoader2Line } from "react-icons/ri";
import { Order, TransactionType } from "../../types";
import { useUserStore } from "../../store/useUserStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import {
  getPaymentMethodRequest,
  transactionRequest,
} from "../../services/transaction";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { API_URL } from "../../conf";
import { ScrollShadow } from "@heroui/react";

interface PaymentMethod {
  id: string;
  cardImage: string;
  cardNumber: null;
  createdAt: Date;
  paymentOptions: string;
}

const municipalities: Municipality[] = [
  { id: "Matanzas", name: "Matanzas" },
  { id: "Boca", name: "Boca" },
  { id: "Santa Marta", name: "Santa Marta" },
  { id: "Varadero", name: "Varadero" },
  { id: "Cantel", name: "Cantel" },
  { id: "Cardenas", name: "Cardenas" },
];

interface PurchaseConfirmationModalProps {
  count: number;
  orderID: number | null;
  totalAmount: number;
  updateOrder: (order: Order) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({
  count,
  orderID,
  totalAmount,
  isOpen,
  updateOrder,
  onClose,
}) => {
  // Form state
  const [hasExpressDelivery, setHasExpressDelivery] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const expressDeliveryCost = 10; // Express delivery cost

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[] | null>(
    null
  );

  const { user, isAuth } = useUserStore();

  const { addNotifications } = useNotificationStore();

  useEffect(() => {
    if (!isAuth) return;
    getPaymentMethodRequest()
      .then((res) => {
        setPaymentMethod(res.data.data);
      })
      .catch(() => {
        toast.error("Error al cargar los metodos de pago");
      });
  }, [isAuth]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const address = data["textarea"] as string;
    const transferId = data["transfer-id"] as string;

    //validaciones
    if (!address) {
      toast.error("Debe ingresar una direccion");
      return;
    }
    if (!transferId) {
      toast.error("Debe ingresar un ID de transferencia");
      return;
    }
    if (!selectedPaymentMethod) {
      toast.error("Debe seleccionar un metodo de pago");
      return;
    }
    if (!selectedMunicipality) {
      toast.error("Debe seleccionar un municipio");
      return;
    }

    setIsSubmitting(true);

    try {
      //peticion a la api
      const socket = io(API_URL);

      socket.emit("registerTransaction", transferId);

      socket.on("transactionStatus", (data) => {
        if (data.status === "confirmed") {
          toast.success(`Transacción ${data.transactionID} confirmada.`);
          addNotifications(data.notification);
        } else if (data.status === "denied") {
          addNotifications(data.notification);
          toast.error(`Transacción ${data.transactionID} denegada.`);
        }
      });

      const value: TransactionType = {
        price: totalAmount,
        productCount: count,
        transactionID: transferId,
        fastDelivery: hasExpressDelivery,
        address,
        town: selectedMunicipality,
        userID: user?.userId,
        orderID: orderID,
        paymentMethodId: selectedPaymentMethod,
      };

      await transactionRequest(value)
        .then((res) => {
          toast.success(res.data.message);
          updateOrder(res.data.order);
          setIsSuccess(true);
        })
        .catch(() => {
          toast.error("Error con la confirmacion de la transferencia.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setIsSuccess(false);
        setHasExpressDelivery(false);
        setSelectedPaymentMethod("");
        setSelectedMunicipality("");
        onClose();
      }, 2000);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSuccess ? () => {} : onClose}
      title="Confirmar Compra"
    >
      {isSuccess ? (
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <MdOutlineCheckCircleOutline className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            ¡Compra Exitosa!
          </h3>
          <p className="text-gray-600">
            Su pedido ha sido procesado correctamente. Recibirá un correo de
            confirmación pronto.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <ScrollShadow
            hideScrollBar
            className=" max-h-[800px]"
            offset={100}
            orientation="vertical"
          >
            <OrderSummary
              price={totalAmount}
              quantity={count}
              hasExpressDelivery={hasExpressDelivery}
              onExpressDeliveryChange={setHasExpressDelivery}
              expressDeliveryCost={expressDeliveryCost}
              currency={"$"}
            />

            <PaymentMethodSelector
              methods={paymentMethod || []}
              selectedMethod={selectedPaymentMethod}
              onSelectMethod={setSelectedPaymentMethod}
            />

            <AddressSelector
              municipalities={municipalities}
              selectedMunicipality={selectedMunicipality}
              onMunicipalityChange={setSelectedMunicipality}
            />

            <TransferIdInput />

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isSubmitting
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <RiLoader2Line className="h-4 w-4 mr-2 animate-spin" />
                    Procesando...
                  </span>
                ) : (
                  "Confirmar Compra"
                )}
              </button>
            </div>
          </ScrollShadow>
        </form>
      )}
    </Modal>
  );
};

export default PurchaseConfirmationModal;
