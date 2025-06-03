import { useEffect, useState } from "react";
import { Worker } from "../type";
import { getWorkersRequest } from "../services/workers";

function useWorker() {
  const [workers, setWorkers] = useState<Worker[] | null>(null);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getWorkersRequest()
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Error al cargar los trabajadores"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { workers, error, loading, setWorkers };
}

export default useWorker;
