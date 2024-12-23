import { useEffect, useState } from "react";
import { PaymentMethod } from "../type";
import { getPaymentMethodRequest } from "../services/paymentMethod";

function usePaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[] | null>(
    null
  );
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

  return {paymentMethod, error, loading}
}

export default usePaymentMethod;
