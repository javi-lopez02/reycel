import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Rating from "./Rating";
import { toast } from "sonner";
import { getSedesRequest } from "../../api/services/sedes";
import { BiUpload, BiX } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useProduct } from "../../api/queries/product";
import { useCategory } from "../../api/queries/categgories";

interface ProductForm {
  name: string;
  description: string;
  price: number;
  investments: number;
  inventoryCount: number;
  ram?: number;
  storage?: number;
  battery?: number;
  mpxCameraFront?: number;
  mpxCameraBack?: number;
  imagenFile?: File;
  miSelectSede: string;
  categoryId: string;
}

const ProductsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const [ratingValue, setRatingValue] = useState(0);
  const [sedes, setSedes] = useState<{ id: string; direction: string }[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { updateProduct, createProduct, productById, isCreating, isUpdating } =
  useProduct();
  const { data, isLoading } = productById(id);

  const { categoryQuery } = useCategory();
  const {
    data: category,
    isError: isErrorCategory,
    error: errorCategory,
  } = categoryQuery;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductForm>();

  useEffect(() => {
    getSedesRequest().then((res) => {
      setSedes(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        name: data.name,
        description: data.description,
        price: data.price,
        investments: data.investments,
        inventoryCount: data.inventoryCount,
        ram: data.ram,
        storage: data.storage,
        battery: data.battery,
        mpxCameraFront: data.mpxCameraFront,
        mpxCameraBack: data.mpxCameraBack,
        miSelectSede: data.sedeId,
        categoryId: data.categoryId,
      });
      setRatingValue(data.ratingAverage!);
      setPreviewUrl(data.imagen!);
    }
  }, [isLoading, data, reset]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCategoryChange = () => {
    const value = watch("categoryId");
    const categorySelected = category?.find((item) => item.id === value);
    return categorySelected?.name;
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 15 * 1024 * 1024; // 5MB
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return "Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG, GIF y WebP.";
    }

    if (file.size > maxSize) {
      return "El archivo es demasiado grande. Máximo 15MB permitido.";
    }

    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log("submit");
    if (id) {
      updateProduct({
        id,
        name: data.name,
        description: data.description,
        price: data.price,
        investments: data.investments,
        inventoryCount: data.inventoryCount,
        ram: data.ram,
        storage: data.storage,
        battery: data.battery,
        mpxCameraFront: data.mpxCameraFront,
        mpxCameraBack: data.mpxCameraBack,
        rating: ratingValue,
        imagenFile: selectedFile,
        sedeId: data.miSelectSede,
        categoryId: data.categoryId,
      })
        .then(() => {
          toast.success("Producto editado exitosamente");
        })
        .catch(() => {
          toast.error("Error al editar el producto");
        });
    } else {
      createProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        investments: data.investments,
        inventoryCount: data.inventoryCount,
        ram: data.ram,
        storage: data.storage,
        battery: data.battery,
        mpxCameraFront: data.mpxCameraFront,
        mpxCameraBack: data.mpxCameraBack,
        rating: ratingValue,
        imagenFile: selectedFile,
        sedeId: data.miSelectSede,
        categoryId: data.categoryId,
      })
        .then(() => {
          toast.success("Producto creado exitosamente");
        })
        .catch(() => {
          toast.error("Error al crear el producto");
        });
    }
    reset();
    navigate("/products");
  });

  return (
    <>
      {isErrorCategory && toast.error(errorCategory.message)}
      {!isLoading && (
        <>
          <section className="flex flex-col gap-1 mx-5 pt-16">
            <h1 className="text-2xl font-bold">Agregar Porducto</h1>
          </section>
          <div className="px-6">
            <Form onSubmit={onSubmit}>
              <div className="flex flex-col items-center w-full gap-4">
                {/* Content */}
                <div className="p-6">
                  {!previewUrl ? (
                    // Upload Area
                    <div className="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200  border-gray-300 hover:border-gray-400 ">
                      <BiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-500 mb-4">
                        Haz clic para seleccionar
                      </p>
                      <button
                        type="button"
                        onClick={handleButtonClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Seleccionar archivo
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("imagenFile")}
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-400 mt-3">
                        JPEG, PNG, GIF, WebP (máx. 15MB)
                      </p>
                    </div>
                  ) : (
                    // Preview Area
                    <div className="space-y-4">
                      {/* Image Preview */}
                      <div className="relative">
                        <img
                          src={previewUrl || ""}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg border border-gray-200"
                        />
                        {!isCreating && !isUpdating && (
                          <button
                            onClick={() => {
                              setPreviewUrl(null);
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                          >
                            <BiX className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <Textarea
                  label="Descripción:"
                  className="z-0"
                  autoFocus
                  labelPlacement="outside"
                  placeholder="Introduce la descripción del Producto."
                  color={errors.description ? "danger" : "default"}
                  errorMessage={errors.description?.message}
                  isInvalid={Boolean(errors.description)}
                  {...register("description", {
                    required: "La descripcion es requerido",
                    minLength: {
                      value: 3,
                      message: "La descripcion debe tener mas de 3 caracteres",
                    },
                  })}
                />
              </div>
              <div className="flex flex-col gap-6 w-full justify-center">
                <div className="flex gap-8 justify-between flex-col lg:flex-row">
                  <Input
                    label="Nombre:"
                    labelPlacement="outside"
                    isRequired
                    className="z-0"
                    placeholder="Introduce el nombre del Producto."
                    type="text"
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
                  {handleCategoryChange() === "Smartphones" ||
                    (handleCategoryChange() === "Telefonos" && (
                      <Input
                        label="Bateria:"
                        className="z-0"
                        labelPlacement="outside"
                        placeholder="Introduce la bateria del Producto."
                        type="text"
                        {...register("battery")}
                      />
                    ))}
                </div>
                <div className="flex gap-8 justify-between flex-col lg:flex-row">
                  <Select
                    className="max-w-xs z-0"
                    labelPlacement="outside"
                    label="Categoría:"
                    placeholder="Selecciona una categoría"
                    defaultSelectedKeys={[data?.categoryId as ""]}
                    {...register("categoryId", {
                      required: "La sede es requerida",
                    })}
                  >
                    {(category ?? []).map((item) => (
                      <SelectItem key={item.id}>{item.name}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    className="w-full z-0"
                    label="Sede"
                    placeholder="Seleccione la Sede"
                    labelPlacement="outside"
                    defaultSelectedKeys={[data?.sedeId as ""]}
                    color={errors.miSelectSede ? "danger" : "default"}
                    errorMessage={errors.miSelectSede?.message}
                    isInvalid={Boolean(errors.miSelectSede)}
                    {...register("miSelectSede", {
                      required: "La sede es requerida",
                    })}
                  >
                    {sedes.map((sede) => (
                      <SelectItem key={sede.id}>{sede.direction}</SelectItem>
                    ))}
                  </Select>
                </div>
                {handleCategoryChange() === "Teléfonos" ||
                  (handleCategoryChange() === "Telefonos" && (
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-8">
                        <Input
                          label="RAM:"
                          className="z-0"
                          labelPlacement="outside"
                          placeholder="Introduce la RAM del Producto."
                          type="text"
                          {...register("ram")}
                        />
                        <Input
                          label="Storage:"
                          labelPlacement="outside"
                          className="z-0"
                          placeholder="Introduce el almacenamiento del Producto."
                          type="text"
                          {...register("storage")}
                        />
                      </div>
                      <div className="flex gap-8">
                        <Input
                          label="MPX Frontal:"
                          className="z-0"
                          labelPlacement="outside"
                          placeholder="Introduce los mpx frontal del Producto."
                          type="text"
                          {...register("mpxCameraFront")}
                        />
                        <Input
                          label="MPX Trasera:"
                          className="z-0"
                          labelPlacement="outside"
                          placeholder="Introduce los mpx traseros del Producto."
                          type="text"
                          {...register("mpxCameraBack")}
                        />
                      </div>
                    </div>
                  ))}
                <div className="flex gap-8 flex-col lg:flex-row">
                  <Rating
                    ratingValue={ratingValue}
                    setRatingValue={setRatingValue}
                  />
                  <Input
                    label="Inversion"
                    isRequired
                    className="z-0"
                    labelPlacement="outside"
                    placeholder="0.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    type="number"
                    color={errors.investments ? "danger" : "default"}
                    errorMessage={errors.investments?.message}
                    isInvalid={Boolean(errors.investments)}
                    {...register("investments", {
                      required: "La inversion es requerida",
                    })}
                  />
                </div>
                <div className="flex justify-between w-full gap-8 flex-col lg:flex-row">
                  <Input
                    label="Precio"
                    className="z-0"
                    isRequired
                    labelPlacement="outside"
                    placeholder="0.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    type="number"
                    color={errors.price ? "danger" : "default"}
                    errorMessage={errors.price?.message}
                    isInvalid={Boolean(errors.price)}
                    {...register("price", {
                      required: "El precio es requerido",
                    })}
                  />
                  <Input
                    label="Cantidad"
                    isRequired
                    className="z-0"
                    labelPlacement="outside"
                    placeholder="Introduce la cantidad"
                    type="number"
                    color={errors.inventoryCount ? "danger" : "default"}
                    errorMessage={errors.inventoryCount?.message}
                    isInvalid={Boolean(errors.inventoryCount)}
                    {...register("inventoryCount", {
                      required: "La cantidad es requerida",
                    })}
                  />
                </div>
              </div>
              <div className="flex justify-end p-5 w-full gap-8">
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    navigate("/products");
                  }}
                >
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  disabled={isCreating && isUpdating}
                  onPress={() => console.log("s")}
                >
                  {isCreating && isUpdating && <Spinner color="default" />}
                  {!isCreating && !isUpdating && "Guardar"}
                </Button>
              </div>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsForm;
