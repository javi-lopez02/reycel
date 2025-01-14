import { useEffect, useState } from "react";
import { PaymentMethod } from "../type";
import {
  deletePaymentMethodRequest,
  getPaymentMethodRequest,
} from "../services/paymentMethod";
import { toast } from "sonner";

function usePaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[] | undefined>();
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getPaymentMethodRequest()
      .then((res) => {
        setPaymentMethod(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Error al cargar los metodos de pago"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deletePaymentMethod = (id: string) => {
    deletePaymentMethodRequest(id)
      .then(() => {
        setPaymentMethod((prevState)=>{
          return prevState?.filter((prev)=> prev.id !== id)
        })
        toast.success("Eliminado con exito")
      })
      .catch(() => {
        setError(["Error al eliminar."]);
      });
  };

  return { paymentMethod, error, loading, deletePaymentMethod };
}

export default usePaymentMethod;
