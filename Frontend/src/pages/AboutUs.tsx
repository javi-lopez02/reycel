import { useEffect, useState } from "react";
import Card from "../components/AboutUs/Card";
import "../index.css";
import { getSedeRequest } from "../services/sedes";
import { Spinner } from "@heroui/spinner";
import { toast } from "sonner";
import { Sedes } from "../types";

export default function AboutUs() {
  const [sedes, setSedes] = useState<Array<Sedes> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Array<string> | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSedeRequest()
      .then((res) => {
        setSedes(res.data.data);
      })
      .catch(() => {
        setError(["Ocurrió un error con la petición"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col p-20 items-center justify-between gap-8">
      <h1 className="text-3xl font-semibold">Nuestras Sedes</h1>
      {loading && <Spinner color="primary" size="md" />}
      {error && error.map((err) => toast.error(err))}
      <div className="grid min-w-full xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {sedes &&
          sedes.map((sede) => {
            return (
              <Card
                key={sede.id}
                image={sede.image}
                address={sede.direction}
                phone={sede.phone}
                workers={sede.workers}
              />
            );
          })}
      </div>
    </div>
  );
}
