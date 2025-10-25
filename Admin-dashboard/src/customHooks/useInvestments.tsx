import { useCallback, useState } from "react";
import { Investments } from "../type";
import {
  createInvestmentsRequest,
  getInvestmentsRequest,
} from "../api/services/investments";

function useInvestments() {
  const [investments, setInvestments] = useState<Investments[] | null>([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  const getInvestments = useCallback(() => {
    setLoading(true);
    getInvestmentsRequest()
      .then((res) => {
        setInvestments(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addInvestments = async (id: string, description: string, price: number) => {
    createInvestmentsRequest({ sedeId: id, description, price })
      .then((res) => {
        if (!investments) {
          setInvestments([res]);
          return;
        }
        setInvestments([...investments, res]);
      })
      .catch((err) => {
        console.log(err);
        setError(["Error al crear la sede."]);
      });
  };

  return {
    investments,
    setInvestments,
    setError,
    error,
    loading,
    getInvestments,
    addInvestments,
  };
}

export default useInvestments;
