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
  validateTransactionRequest,
} from "../../services/transaction";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { API_URL } from "../../conf";
import ModalErrorConfirm from "./ModalErrorConfirm";

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
  orderID: number;
  totalAmount: number;
  updateOrder: (order: Order) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({
  count,
  totalAmount,
  isOpen,
  orderID,
  updateOrder,
  onClose,
}) => {
  // Form state
  const [hasExpressDelivery, setHasExpressDelivery] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [step, setStep] = useState<"order" | "payment" | "success">("order");
  const [errorProducts, setErrorProducts] = useState([]);
  const [isOpenError, setIsOpenError] = useState(false);

  const expressDeliveryCost = 10; // Express delivery cost

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[] | null>(
    null
  );

  const { isAuth } = useUserStore();

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

  const onCloseError = () => {
    setIsOpenError(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

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
        orderID: orderID,
        paymentMethodId: selectedPaymentMethod,
      };

      await transactionRequest(value)
        .then((res) => {
          toast.success(res.data.message);
          updateOrder(res.data.order);
          setIsSuccess(true);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Error con la confirmacion de la transferencia.");
          }
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
      }, 5000);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const addressForm = data["textarea"] as string;

    setIsSubmitting(true);

    //validaciones
    if (!addressForm) {
      toast.error("Debe ingresar una direccion");
      return;
    }
    setAddress(addressForm);

    validateTransactionRequest(orderID)
      .then((res) => {
        toast.success(res.data.message);
        setStep("payment");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error("Productos agotados...");
          setIsOpenError(true);
          setErrorProducts(error.response.data.data);
        } else {
          toast.error("Error con la confirmacion de la transferencia.");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const isPaymentFormValid = selectedPaymentMethod !== "";

  const isOrderFormValid = selectedMunicipality !== "";
  // Handle modal close
  const handleClose = () => {
    if (step === "success") return;
    setStep("order");
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={step === "payment" ? "Método de Pago" : "Confirmar Compra"}
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
        ) : step === "success" ? (
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
        ) : step === "order" ? (
          <form onSubmit={handleOrderConfirm}>
            <OrderSummary
              price={totalAmount}
              quantity={count}
              hasExpressDelivery={hasExpressDelivery}
              onExpressDeliveryChange={setHasExpressDelivery}
              expressDeliveryCost={expressDeliveryCost}
              currency={"$"}
            />

            <AddressSelector
              municipalities={municipalities}
              selectedMunicipality={selectedMunicipality}
              onMunicipalityChange={setSelectedMunicipality}
            />

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!isOrderFormValid}
                className={`px-6 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isOrderFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                }`}
              >
                Continuar al Pago
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <PaymentMethodSelector
              methods={paymentMethod || []}
              selectedMethod={selectedPaymentMethod}
              onSelectMethod={setSelectedPaymentMethod}
            />

            <TransferIdInput />

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setStep("order")}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={!isPaymentFormValid || isSubmitting}
                className={`px-6 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isPaymentFormValid && !isSubmitting
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
          </form>
        )}
      </Modal>
      <ModalErrorConfirm isOpen={isOpenError} onClose={onCloseError} errorProducts={errorProducts}/>
    </>
  );
};

export default PurchaseConfirmationModal;
