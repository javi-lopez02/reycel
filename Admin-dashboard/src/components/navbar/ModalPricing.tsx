import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { editCurrency, getCurrency } from "../../services/currencyExchange";
import { toast } from "sonner";

interface CurrencyExchange {
  id: string;
  cup: number;
  eur: number;
  updatedAt: string;
}

const ModalPricing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [currencyExchange, setCurrencyExchange] =
    useState<CurrencyExchange | null>(null);

  useEffect(() => {
    setLoading(true);
    getCurrency()
      .then((res) => {
        setCurrencyExchange(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al cargar la tasa de cambio.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currencyExchange) {
      toast.error("No sea podido actualizar la tasa de cambio.")
      return
    }
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const inputEur = parseFloat(data["eur"] as string);

    const inputCup = parseInt(data["cup"] as string);

    console.table({inputEur, inputCup})

    editCurrency(inputCup, inputEur, currencyExchange.id)
      .then((res) => {
        setCurrencyExchange(res.data.data);
        console.log(res.data)
        toast.success("Tasa de cambio actualizada.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar la tasa de cambio.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formatearFecha = useCallback((isoString: string) => {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const fecha = new Date(isoString);

    const dia = fecha.getUTCDate();
    const mes = meses[fecha.getUTCMonth()];
    const anio = fecha.getUTCFullYear();

    return `${dia} ${mes} ${anio}`;
  }, []);

  return (
    <>
      <Tooltip
        placement="bottom"
        content={
          <div className="px-1">
            <div className="text-small font-bold">Sobre la tasa de cambio</div>
            {loading && <Spinner color="warning" />}
            {!loading && currencyExchange && (
              <div className="flex flex-col items-center text-tiny justify-center font-medium">
                <p>1 USD = {currencyExchange?.eur}</p>
                <p>1 USD = {currencyExchange?.cup}</p>
                <span className="font-medium">
                  Fecha: {formatearFecha(currencyExchange?.updatedAt)}
                </span>
              </div>
            )}
          </div>
        }
      >
        <div
          onClick={onOpen}
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 11 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"
            />
          </svg>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Monedas
          </div>
        </div>
      </Tooltip>

      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Editar Tasa de Cambio</h1>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <div className="flex gap-4 min-w-full">
                    <Input
                      className="min-w-1/5"
                      startContent={
                        <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                          $
                        </span>
                      }
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          USD
                        </span>
                      }
                      disabled
                      label="USD"
                      placeholder="1"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      name="eur"
                      className="min-w-1/5"
                      startContent={
                        <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                          $
                        </span>
                      }
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          EUR
                        </span>
                      }
                      label="EUR"
                      placeholder="EUR"
                      defaultValue={String(currencyExchange?.eur)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>
                  <div className="flex gap-4 min-w-full">
                    <Input
                      className="min-w-1/5"
                      startContent={
                        <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                          $
                        </span>
                      }
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          USD
                        </span>
                      }
                      disabled
                      label="USD"
                      placeholder="1"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      name="cup"
                      className="min-w-1/5"
                      startContent={
                        <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                          $
                        </span>
                      }
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          CUP
                        </span>
                      }
                      label="CUP"
                      defaultValue={String(currencyExchange?.cup)}
                      placeholder="CUP"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>

                  <div className="flex min-w-full justify-end mt-5 gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Guardar
                    </Button>
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPricing;
