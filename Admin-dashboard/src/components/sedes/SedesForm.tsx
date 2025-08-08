import { Button, Form, Input, Spinner, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useSedeQuery } from "../../api/queries/sede";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

interface SedesForm {
  direction: string;
  phone: string;
  rent: number;
}

const SedesForm = () => {
  const { createSede, updateSede, sedeById, isCreating, isUpdating } =
    useSedeQuery();
  const { id } = useParams();
  const { data: sedeData, isLoading } = sedeById(id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SedesForm>();

  useEffect(() => {
    if (id && !isLoading) {
      reset({
        direction: sedeData?.direction,
        phone: sedeData?.phone,
        rent: sedeData?.rent,
      });
    }
  }, [id, isLoading, reset, sedeData]);

  const onSubmit = handleSubmit((data) => {
    if (id) {
      updateSede({
        id,
        phone: data.phone,
        direction: data.direction,
        rent: data.rent,
      })
        .then(() => {
          toast.success("Sede actualizada exitosamente");
        })
        .catch(() => {
          toast.error("Error al actualizar la sede");
        })
        .finally(() => {
          reset();
          navigate("/sedes");
        });
    } else {
      createSede({
        phone: data.phone,
        direction: data.direction,
        rent: data.rent,
      })
        .then(() => {
          toast.success("Sede creada exitosamente");
        })
        .catch(() => {
          toast.error("Error al crear la sede");
        })
        .finally(() => {
          reset();
          navigate("/sedes");
        });
    }
  });

  return (
    <>
      <section className="flex items-end  space-x-2 gap-1 font-[sans-serif] pt-20 px-12">
        <h1 className="text-2xl font-bold">Agregar Sede</h1>
      </section>
      {!isLoading && (
        <section className="sm:px-12 px-4">
          <Form onSubmit={onSubmit}>
            <div className="flex flex-col gap-4 min-w-full items-center">
              <img
                className="w-4/5 h-52 bg-neutral-300 rounded-lg"
                src="./logo.webp"
                alt="imagen de telefono"
              />
            </div> 
            <div className="flex gap-2 min-w-full">
              <Input
                autoFocus
                startContent={
                  <span className="text-sm text-default-800 pointer-events-none flex-shrink-0">
                    +53
                  </span>
                }
                endContent={
                  <svg
                    className="w-6 h-6 text-gray-500 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                label="Telefono"
                placeholder="XXXXXXXX"
                variant="bordered"
                labelPlacement="outside"
                color={errors.phone ? "danger" : "default"}
                errorMessage={errors.phone?.message}
                isInvalid={Boolean(errors.phone)}
                {...register("phone", {
                  required: "El telefono es requerido",
                })}
              />
              <Input
                startContent={
                  <span className="text-sm text-default-800 pointer-events-none flex-shrink-0">
                    $
                  </span>
                }
                label="Renta del Local"
                placeholder="Ingrese el monto de la renta"
                variant="bordered"
                labelPlacement="outside"
                color={errors.rent ? "danger" : "default"}
                errorMessage={errors.rent?.message}
                isInvalid={Boolean(errors.rent)}
                {...register("rent", {
                  valueAsNumber: true,
                  required: "La renta es requerida",
                })}
              />
            </div>
            <Textarea
              label="Direccion:"
              isRequired
              labelPlacement="outside"
              placeholder="Introduce la direccion de la sede."
              {...register("direction", {
                required: "La direccion es requerida",
              })}
            />
            <div className="flex min-w-full justify-end mt-5 gap-3">
              <Button color="danger" variant="light" onPress={() => navigate("../")}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                {isCreating || (isUpdating && <Spinner color="danger" />)}
                {!isCreating && !isUpdating && <span>Guardar</span>}
              </Button>
            </div>
          </Form>
        </section>
      )}
    </>
  );
};

export default SedesForm;
