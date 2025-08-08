import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useSedeQuery } from "../../api/queries/sede";
import { useInvestmentQuery } from "../../api/queries/investements";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface InvestmentForm {
  description: string;
  price: number;
  sedeId: string;
}

const InvestmentsForm = () => {
  const navigate = useNavigate();
  const { sedeQuery } = useSedeQuery();
  const { data: sedes } = sedeQuery;

  const { createInvestment, isCreating } = useInvestmentQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvestmentForm>();

  const onSubmit = handleSubmit((data) => {
    createInvestment(data)
      .then(() => {
        toast.success("Inversion o merma creada exitosamente");
      })
      .catch(() => {
        toast.error("Error al crear la inversion o merma");
      })
      .finally(() => {
        navigate("../");
      });
  });

  return (
    <>
      <section className="flex items-end  space-x-2 gap-1 font-[sans-serif] pt-20 sm:px-14 px-5 pb-5">
        <h1 className="text-2xl font-bold">Agregar Inversion o Merma</h1>
      </section>
      <section className="sm:px-14 px-5">
        <Form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 min-w-full items-center">
            <Select
              isRequired
              className="w-full"
              label="Sede"
              placeholder="Seleccione la Sede"
              labelPlacement="outside"
              color={errors.sedeId ? "danger" : "default"}
              errorMessage={errors.sedeId?.message}
              isInvalid={Boolean(errors.sedeId)}
              {...register("sedeId", {
                required: "La sede es requerida",
              })}
            >
              {(sedes ?? []).map((sede) => (
                <SelectItem key={sede.id}>{sede.direction}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-2 min-w-full">
            <Input
              autoFocus
              startContent={
                <span className="text-sm text-default-800 pointer-events-none flex-shrink-0">
                  $
                </span>
              }
              label="Precio"
              placeholder="Ingrese el precio de la inversion o merma"
              variant="bordered"
              labelPlacement="outside"
              color={errors.price ? "danger" : "default"}
              errorMessage={errors.price?.message}
              isInvalid={Boolean(errors.price)}
              {...register("price", {
                valueAsNumber: true,
                required: "El precio es requerido",
              })}
            />
          </div>
          <Textarea
            label="Descripcion:"
            isRequired
            labelPlacement="outside"
            placeholder="Introduce la descripcion de la inversion o merma."
            color={errors.description ? "danger" : "default"}
            errorMessage={errors.description?.message}
            isInvalid={Boolean(errors.description)}
            {...register("description", {
              required: "La descripcion es requerida",
            })}
          />
          <div className="flex min-w-full justify-end mt-5 gap-3">
            <Button color="danger" variant="light" onPress={() => navigate("../")}>
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              {isCreating && <Spinner color="danger" />}
              {!isCreating && <span>Guardar</span>}
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default InvestmentsForm;
