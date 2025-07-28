import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BiDollar, BiLock, BiUser } from "react-icons/bi";
import { toast } from "sonner";
import { getSedesRequest } from "../../api/services/sedes";
import { useNavigate, useParams } from "react-router-dom";
import { useWorker } from "../../api/queries/workers";

interface WorkerForm {
  username: string;
  password?: string;
  passwordConfirm?: string;
  salary: number;
  miSelectSede: string;
}

const WorkersForm = () => {
  const { id } = useParams();
  const [sedes, setSedes] = useState<{ id: string; direction: string }[]>([]);
  const navigate = useNavigate();
  const { workerById, createWorker, updateWorker, isCreating, isUpdating } =
    useWorker();
  const { data: workerData, isLoading } = workerById(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkerForm>();

  useEffect(() => {
    getSedesRequest().then((res) => {
      setSedes(res.data.data);
    });
  }, [id, isLoading]);

  useEffect(() => {
    if (!isLoading && workerData) {
      reset({
        username: workerData.username,
        salary: workerData.salary,
        miSelectSede: workerData.sedeId,
      });
    }
  }, [isLoading, workerData, reset]);

  const onSubmit = handleSubmit((data) => {
    if (id) {
      updateWorker({
        id,
        password: data.password,
        salary: data.salary,
        username: data.username,
        sedeId: data.miSelectSede,
      })
        .then(() => {
          toast.success("Trabajador editado exitosamente");
        })
        .catch(() => {
          toast.error("Error al editar el trabajador");
        })
        .finally(() => {
          reset();
          navigate("/workers");
        });
    } else {
      if (data.password !== data.passwordConfirm || !data.password) {
        toast.error("Las contraceñas no coinciden");
        return;
      }
      createWorker({
        username: data.username,
        password: data.password,
        salary: data.salary,
        sedeId: data.miSelectSede,
      })
        .then(() => {
          toast.success("Trabajador creado exitosamente");
        })
        .catch(() => {
          toast.error("Error al crear el trabajador");
        })
        .finally(() => {
          reset();
          navigate("/workers");
        });
    }
  });

  return (
    <section className="sm:px-10 px-4">
      <section className="flex items-end  space-x-2 gap-1 font-[sans-serif] pt-16 pb-6">
        <h1 className="text-2xl font-bold">Agregar Usuario</h1>
      </section>
      <section>
        {!isLoading && (
          <Form onSubmit={onSubmit}>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                <Input
                  autoFocus
                  endContent={
                    <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Usuario"
                  placeholder="Entra el usuario"
                  variant="bordered"
                  color={errors.username ? "danger" : "default"}
                  errorMessage={errors.username?.message}
                  isInvalid={Boolean(errors.username)}
                  labelPlacement="outside"
                  className="z-0"
                  {...register("username", {
                    required: "Nombre del trabajador es requerido",
                    minLength: {
                      value: 3,
                      message:
                        "El nombre del trabjador debe tener mas de 3 caracteres",
                    },
                  })}
                />
                {errors.username && toast.error(errors.username.message)}

                <Input
                  endContent={
                    <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Entra el password"
                  type="password"
                  variant="bordered"
                  color={errors.password ? "danger" : "default"}
                  errorMessage={errors.password?.message}
                  isInvalid={Boolean(errors.password)}
                  labelPlacement="outside"
                  className="z-0"
                  {...register("password", {
                    required: !id && "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener más de 6 caracteres",
                    },
                  })}
                />
                {/* {errors.password && toast.error(errors.password.message)} */}
                <Input
                  endContent={
                    <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Confirmar Password"
                  placeholder="Confirma el password"
                  type="password"
                  variant="bordered"
                  color={errors.passwordConfirm ? "danger" : "default"}
                  errorMessage={errors.passwordConfirm?.message}
                  isInvalid={Boolean(errors.passwordConfirm)}
                  labelPlacement="outside"
                  className="z-0"
                  {...register("passwordConfirm", {
                    required: !id && "Debe confirmar las contraseña",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe coincidir",
                    },
                  })}
                />
                {/* {errors.passwordConfirm &&
                  toast.error(errors.passwordConfirm.message)} */}
              </div>
            </div>
            <div className="w-full flex justify-between gap-4">
              <Input
                endContent={
                  <BiDollar className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Salario Fijo"
                className="z-0"
                placeholder="Salario Fijo"
                type="text"
                color={errors.salary ? "danger" : "default"}
                errorMessage={errors.salary?.message}
                isInvalid={Boolean(errors.salary)}
                variant="bordered"
                labelPlacement="outside"
                {...register("salary", {
                  valueAsNumber: true,
                  required: "El salario es requerido",
                })}
              />
              {errors.salary && toast.error(errors.salary.message)}
            </div>
            <Select
              className="w-full z-0"
              variant="bordered"
              label="Sede"
              placeholder="Seleccione la Sede"
              labelPlacement="outside"
              defaultSelectedKeys={[workerData?.sedeId as ""]}
              {...register("miSelectSede", {
                required: "La sede es requerida",
              })}
            >
              {sedes.map((sede) => (
                <SelectItem key={sede.id}>{sede.direction}</SelectItem>
              ))}
            </Select>

            <div className="flex min-w-full justify-end mt-5 gap-3">
              <Button
                color="danger"
                variant="light"
                onPress={() => navigate("/workers")}
              >
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                {(isCreating || isUpdating) && <Spinner color="default" />}
                {(!isCreating || !isUpdating) && (
                  <span className=" font-semibold">Guardar</span>
                )}
              </Button>
            </div>
          </Form>
        )}
      </section>
    </section>
  );
};

export default WorkersForm;
