import { useEffect, useState } from "react";
import { Payment } from "../type";
import { getPaymentsRequest } from "../api/services/payments";

function usePayments() {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Array<string> | null>(null);

  useEffect(() => {
    getPaymentsRequest({
      filterValue: "",
      sortDescriptor: { column: "", direction: "ascending" },
      rowsPerPage: 10,
      page: 1,
    })
      .then((res) => {
        setPayments(res.payment);
      })
      .catch((err) => {
        console.log(err);
        setError(["Error al cargar los Pagos"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { payments, loading, error };
}

export default usePayments;
