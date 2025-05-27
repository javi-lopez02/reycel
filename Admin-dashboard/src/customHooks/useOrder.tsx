import { useEffect, useState } from "react";
import { Order } from "../type";
import { getOrderRequest } from "../services/order";

function useOrder() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Array<string> | null>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getOrderRequest()
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Error al cargar las ordenes"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { error, loading, orders, setOrders };
}

export default useOrder;
