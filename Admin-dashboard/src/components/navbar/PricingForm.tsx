import { Button, Form, Input } from "@heroui/react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCurrencyQuery } from "../../api/queries/currencyExchange";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CurrencyForm {
  eur: number;
  cad: number;
  gbp: number;
  cupTransfer: number;
  mlcTransfer: number;
  cup: number;
  zelle: number;
}

function PricingForm() {
  const navigate = useNavigate();
  const { currencyQuery, createCurrency, updateCurrency } = useCurrencyQuery();
  const { data, isLoading } = currencyQuery;

  const currencyExchange = data?.[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CurrencyForm>();

  useEffect(() => {
    if (currencyExchange && !isLoading) {
      reset({
        eur: currencyExchange.eur,
        cad: currencyExchange.cad,
        gbp: currencyExchange.gbp,
        cupTransfer: currencyExchange.cupTransfer,
        mlcTransfer: currencyExchange.mlcTransfer,
        cup: currencyExchange.cup,
        zelle: currencyExchange.zelle,
      });
    }
  }, [currencyExchange, isLoading]);

  const onSubmit = handleSubmit((data) => {
    if (currencyExchange?.id !== undefined) {
      updateCurrency({
        id: currencyExchange.id,
        cad: data.cad,
        cup: data.cup,
        cupTransfer: data.cupTransfer,
        eur: data.eur,
        gbp: data.gbp,
        mlcTransfer: data.mlcTransfer,
        zelle: data.zelle,
      })
        .then(() => {
          toast.success("Monedas editadas exitosamente");
        })
        .catch(() => {
          toast.error("Error al editar las monedas");
        })
        .finally(() => {
          reset();
          navigate("../");
        });
    } else {
      createCurrency({
        cad: data.cad,
        cup: data.cup,
        cupTransfer: data.cupTransfer,
        eur: data.eur,
        gbp: data.gbp,
        mlcTransfer: data.mlcTransfer,
        zelle: data.zelle,
      })
        .then(() => {
          toast.success("Monedas creadas exitosamente");
        })
        .catch(() => {
          toast.error("Error al crear las monedas");
        })
        .finally(() => {
          reset();
          navigate("../");
        });
    }
  });

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
      <section className="flex-col items-end  space-x-2 gap-1 font-[sans-serif] sm:pt-20 pt-16 sm:px-14 px-5 pb-5">
        <h1 className="text-2xl font-bold">Editar Tasa de Cambio</h1>
        <span className="font-medium">
          Fecha: {formatearFecha(currencyExchange?.updatedAt!)}
        </span>
      </section>
      {!isLoading && (
        <section className="sm:px-14 px-5 pb-5">
          <Form onSubmit={onSubmit}>
            <div className="flex gap-4 min-w-full">
              <Input
                className="min-w-1/5 z-0"
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
                className="min-w-1/5 z-0"
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
                variant="bordered"
                labelPlacement="outside"
                type="number"
                color={errors.eur ? "danger" : "default"}
                errorMessage={errors.eur?.message}
                isInvalid={Boolean(errors.eur)}
                {...register("eur", {
                  valueAsNumber: true,
                  required: "El salario es requerido",
                })}
              />
            </div>
            <div className="flex gap-4 min-w-full">
              <Input
                className="min-w-1/5 z-0"
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
                className="min-w-1/5 z-0"
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
                type="number"
                placeholder="CUP"
                variant="bordered"
                labelPlacement="outside"
                color={errors.cup ? "danger" : "default"}
                errorMessage={errors.cup?.message}
                isInvalid={Boolean(errors.cup)}
                {...register("cup", {
                  valueAsNumber: true,
                  required: "El salario es requerido",
                })}
              />
            </div>
            <div className="flex gap-4 min-w-full">
              <Input
                className="min-w-1/5 z-0"
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
                className="min-w-1/5 z-0"
                startContent={
                  <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                    $
                  </span>
                }
                endContent={
                  <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                    CAD
                  </span>
                }
                label="CAD"
                type="number"
                placeholder="CAD"
                variant="bordered"
                labelPlacement="outside"
                color={errors.cad ? "danger" : "default"}
                errorMessage={errors.cad?.message}
                isInvalid={Boolean(errors.cad)}
                {...register("cad", {
                  valueAsNumber: true,
                  required: "El salario es requerido",
                })}
              />
            </div>
            <div className="flex gap-4 min-w-full">
              <Input
                className="min-w-1/5 z-0"
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
                className="min-w-1/5 z-0"
                startContent={
                  <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                    $
                  </span>
                }
                endContent={
                  <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                    GBP
                  </span>
                }
                label="GBP"
                type="number"
                placeholder="GBP"
                variant="bordered"
                labelPlacement="outside"
                color={errors.gbp ? "danger" : "default"}
                errorMessage={errors.gbp?.message}
                isInvalid={Boolean(errors.gbp)}
                {...register("gbp", {
                  valueAsNumber: true,
                  required: "El salario es requerido",
                })}
              />
            </div>
            <div className="flex gap-4 min-w-full">
              <Input
                className="min-w-1/5 z-0"
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
                className="min-w-1/5 z-0"
                startContent={
                  <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                    $
                  </span>
                }
                label="CUP Transferencia"
                type="number"
                placeholder="TRANSFER-CUP"
                variant="bordered"
                labelPlacement="outside"
                color={errors.cupTransfer ? "danger" : "default"}
                errorMessage={errors.cupTransfer?.message}
                isInvalid={Boolean(errors.cupTransfer)}
                {...register("cupTransfer", {
                  valueAsNumber: true,
                  required: "El salario es requerido",
                })}
              />
            </div>
            <div className="flex gap-4 min-w-full">
              <Input
                className="min-w-1/5 z-0"
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
                className="min-w-1/5 z-0"
                startContent={
                  <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                    $
                  </span>
                }
                endContent={
                  <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                    MLC
                  </span>
                }
                label="MLC Transferencia"
                placeholder="MLC "
                type="number"
                variant="bordered"
                labelPlacement="outside"
                color={errors.mlcTransfer ? "danger" : "default"}
                errorMessage={errors.mlcTransfer?.message}
                isInvalid={Boolean(errors.mlcTransfer)}
                {...register("mlcTransfer", {
                  valueAsNumber: true,
                  required: "El salario es requerido",
                })}
              />
            </div>
            <div className="flex gap-4 min-w-full">
              <Input
                className="min-w-1/5 z-0"
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
                className="min-w-1/5 z-0"
                startContent={
                  <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                    $
                  </span>
                }
                endContent={
                  <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                    Zelle
                  </span>
                }
                label="Zelle"
                placeholder="Zelle"
                type="number"
                variant="bordered"
                labelPlacement="outside"
                color={errors.zelle ? "danger" : "default"}
                errorMessage={errors.zelle?.message}
                isInvalid={Boolean(errors.zelle)}
                {...register("zelle", {
                  valueAsNumber: true,
                  required: "El salario es requerido",
                })}
              />
            </div>

            <div className="flex min-w-full justify-end mt-5 gap-3">
              <Button
                color="danger"
                variant="light"
                onPress={() => navigate("../")}
              >
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </section>
      )}
    </>
  );
}

export default PricingForm;
