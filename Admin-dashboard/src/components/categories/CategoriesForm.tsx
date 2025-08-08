import { Button, Form, Input, Spinner } from "@heroui/react";
import { BiMoney, BiRename } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCategory } from "../../api/queries/categgories";
import { toast } from "sonner";
import { useEffect } from "react";

interface CategoryForm {
  name: string;
  profitsBySell: number;
}

const CategoriesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    createCategory,
    updateCategory,
    categoryById,
    isCreating,
    isUpdating,
  } = useCategory();
  const { data, isLoading } = categoryById(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>();

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        name: data.name,
        profitsBySell: data.profitsBySell,
      });
    }
  }, [isLoading, data, reset]);

  const onSubmit = handleSubmit((data) => {
    if (id) {
      updateCategory({
        id,
        name: data.name,
        profitsBySell: data.profitsBySell,
      })
        .then(() => {
          toast.success("Categoría editada exitosamente");
        })
        .catch(() => {
          toast.error("Error al editar la categoría");
        })
        .finally(() => {
          reset();
          navigate("/categories");
        });
    } else {
      createCategory({
        name: data.name,
        profitsBySell: data.profitsBySell,
      })
        .then(() => {
          toast.success("Categoría creada exitosamente");
        })
        .catch(() => {
          toast.error("Error al crear la categoría");
        })
        .finally(() => {
          reset();
          navigate("/categories");
        });
    }
  });

  return (
    !isLoading && (
      <>
        <section className="flex items-end  space-x-2 gap-1 font-[sans-serif] pt-16 px-6 pb-4">
          <h1 className="text-2xl font-bold">Agregar Categoría</h1>
        </section>
        <section className="px-5">
          <Form onSubmit={onSubmit}>
            <Input
              autoFocus
              endContent={
                <BiRename className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Nombre"
              placeholder="Inserte el Nombre de la categroría"
              variant="bordered"
              labelPlacement="outside"
              className="z-0"
              color={errors.name ? "danger" : "default"}
              errorMessage={errors.name?.message}
              isInvalid={Boolean(errors.name)}
              {...register("name", {
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener mas de 3 caracteres",
                },
              })}
            />
            <Input
              endContent={
                <BiMoney className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              className="z-0"
              label="Ganancias del trabajador por Venta"
              placeholder="Inserte la ganancia"
              variant="bordered"
              labelPlacement="outside"
              color={errors.profitsBySell ? "danger" : "default"}
              errorMessage={errors.profitsBySell?.message}
              isInvalid={Boolean(errors.profitsBySell)}
              {...register("profitsBySell", {
                required: "La ganancia es requerida",
              })}
            />
            <div className="flex min-w-full justify-end mt-5 gap-3">
              <Button
                color="danger"
                variant="light"
                onPress={() => navigate("/categories")}
              >
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                {isCreating && isUpdating && <Spinner color="default" />}
                {!isCreating && !isUpdating && (
                  <span className="font-medium">Guardar</span>
                )}
              </Button>
            </div>
          </Form>
        </section>
      </>
    )
  );
};

export default CategoriesForm;
