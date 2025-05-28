import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { FC, useEffect, useState } from "react";
import Selected from "./Selected";
import Rating from "./Rating";
import {
  createProductRequest,
  updateProductRequest,
} from "../../services/product";
import { toast } from "sonner";
import { Category, Products } from "../../type";
import { getSedesRequest } from "../../services/sedes";

interface Props {
  setProducts: React.Dispatch<React.SetStateAction<Products[] | null>>;
  isOpen: boolean;
  onClose: () => void;
  rating?: number;
  id?: string;
  price?: number;
  inventoryCount?: number;
  name?: string;
  description?: string;
  imagen?: string;
  category?: Category;
}

const ModalAddProduct: FC<Props> = ({
  description,
  isOpen,
  id,
  onClose,
  inventoryCount,
  price,
  name,
  rating,
  category,
  setProducts,
  imagen: initialImageUrl,
}) => {
  const [ratingValue, setRatingValue] = useState(rating || 0);
  const [imageUrl, setImageUrl] = useState<string>("./producto.webp");
  const [sedes, setSedes] = useState<{ id: string; direction: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sedeId, setSedeId] = useState<string>("");

  useEffect(() => {
    getSedesRequest().then((res) => {
      setSedes(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (id) {
      setRatingValue(rating || 0);
      setImageUrl(initialImageUrl || "./producto.webp");
    }
    return () => {
      setRatingValue(0);
      setImageUrl("./producto.webp");
    };
  }, [id, initialImageUrl, rating]);

  const [loading, setLoading] = useState(false);

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleSedeId = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setSedeId(value.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const selectedCategoryId = data["selected"] as string;
    const inputName = data["name"] as string;
    const price = parseInt(data["price"] as string);
    const description = data["description"] as string;
    const inventoryCount = parseInt(data["inventoryCount"] as string);
    const inputRating = ratingValue;
    const imagen = data["imageUrl"] as string;

    // Validaciones
    if (!inputName) {
      toast.error("El nombre del producto es requerido.");
      setLoading(false);
      return;
    }
    if (!selectedCategoryId) {
      toast.error("La categoría del producto es requerida.");
      setLoading(false);
      return;
    }
    if (!price) {
      toast.error("El precio del producto es requerido.");
      setLoading(false);
      return;
    }
    if (!description) {
      toast.error("La descripción del producto es requerida.");
      setLoading(false);
      return;
    }
    if (!inventoryCount) {
      toast.error("La cantidad de inventario del producto es requerida.");
      setLoading(false);
      return;
    }
    if (!imagen) {
      toast.error("La URL de la imagen del producto es requerida.");
      setLoading(false);
      return;
    }
    if (!sedeId) {
      toast.error("La sede del producto es requerida.");
      setLoading(false);
      return;
    }

    if (selectedCategory === "Smartphones") {
      const storage = parseInt(data["storage"] as string);
      const ram = parseInt(data["ram"] as string);
      const mpxback = parseInt(data["back"] as string);
      const mpxfront = parseInt(data["front"] as string);
      const battery = parseInt(data["bateria"] as string);

      if (!storage) {
        toast.error("El storage del producto es requerido.");
        setLoading(false);
        return;
      }
      if (!ram) {
        toast.error("La ram del producto es requerida.");
        setLoading(false);
        return;
      }
      if (!mpxback) {
        toast.error("Los mpx traseros del producto son requeridos.");
        setLoading(false);
        return;
      }
      if (!mpxfront) {
        toast.error("Los mpx frontales del producto son requeridos.");
        setLoading(false);
        return;
      }
      if (!battery) {
        toast.error("La bateria del producto es requerida.");
        setLoading(false);
        return;
      }

      if (name && id && category) {
        let categoryId = selectedCategoryId;
        if (selectedCategoryId === "") {
          categoryId = category.id;
        }
        updateProductRequest(id, {
          categoryId: categoryId,
          name: inputName,
          price,
          description,
          inventoryCount,
          rating: inputRating,
          imagen,
          ram,
          storage,
          mpxCameraBack: mpxback,
          mpxCameraFront: mpxfront,
          battery,
          sedeId,
        })
          .then((res) => {
            toast.success("Producto actualizado con exito.");
            setProducts((prev) => {
              const products = prev?.filter((product) => {
                return product.id !== id;
              });
              res.data.data.rating = ratingValue;
              return prev ? [res.data.data, ...(products || [])] : null;
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error al crear el producto.");
          })
          .finally(() => {
            setLoading(false);
            onClose();
          });
      }

      if (!name) {
        createProductRequest({
          categoryId: selectedCategoryId,
          name: inputName,
          price,
          description,
          inventoryCount,
          rating: inputRating,
          imagen,
          ram,
          storage,
          mpxCameraBack: mpxback,
          mpxCameraFront: mpxfront,
          battery,
          sedeId,
        })
          .then((res) => {
            toast.success("Producto creado con exito.");
            setProducts((prev) => {
              res.data.data.rating = ratingValue;
              return prev ? [res.data.data, ...prev] : null;
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error al crear el producto.");
          })
          .finally(() => {
            setLoading(false);
            onClose();
          });
      }
    } else {
      if (name && id && category) {
        let categoryId = selectedCategoryId;
        if (selectedCategoryId === "") {
          categoryId = category.id;
        }
        updateProductRequest(id, {
          categoryId: categoryId,
          name: inputName,
          price,
          description,
          inventoryCount,
          rating: inputRating,
          imagen,
          sedeId,
        })
          .then((res) => {
            toast.success("Producto actualizado con exito.");
            setProducts((prev) => {
              const products = prev?.filter((product) => {
                return product.id !== id;
              });
              res.data.data.rating = ratingValue;
              return prev ? [res.data.data, ...(products || [])] : null;
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error al crear el producto.");
          })
          .finally(() => {
            setLoading(false);
            onClose();
          });
      }

      if (!name) {
        createProductRequest({
          categoryId: selectedCategoryId,
          name: inputName,
          price,
          description,
          inventoryCount,
          rating: inputRating,
          imagen,
          sedeId,
        })
          .then((res) => {
            toast.success("Producto creado con exito.");
            setProducts((prev) => {
              res.data.data.rating = ratingValue;
              return prev ? [res.data.data, ...prev] : null;
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error al crear el producto.");
          })
          .finally(() => {
            setLoading(false);
            onClose();
          });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} size="5xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-2xl">Agregar Porducto</h1>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <div className="flex gap-8 w-full">
                  <div className="flex flex-col items-center w-full gap-4">
                    <img
                      className="size-60 bg-neutral-300"
                      src={imageUrl}
                      alt="imagen de telefono"
                    />
                    <div className="pt-5 w-full">
                      <h1>Introduce la url de la Imagen</h1>
                      <Input
                        size="md"
                        color="primary"
                        name="imageUrl"
                        defaultValue={imageUrl}
                        className="pt-2"
                        placeholder="url/imagen.com"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              https://
                            </span>
                          </div>
                        }
                        type="url"
                        onChange={handleImageUrlChange}
                      />
                    </div>
                    <Textarea
                      label="Descripción:"
                      name="description"
                      isRequired
                      defaultValue={description}
                      labelPlacement="outside"
                      placeholder="Introduce la descripción del Producto."
                    />
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-8 justify-between">
                      <Input
                        name="name"
                        label="Nombre:"
                        defaultValue={name}
                        labelPlacement="outside"
                        isRequired
                        placeholder="Introduce el nombre del Producto."
                        type="text"
                      />
                      {selectedCategory === "Smartphones" && (
                        <Input
                          name="bateria"
                          label="Bateria:"
                          labelPlacement="outside"
                          isRequired
                          placeholder="Introduce la bateria del Producto."
                          type="text"
                        />
                      )}
                    </div>
                    <div className="flex gap-8 justify-between">
                      <Selected setSelectedCategory={setSelectedCategory} />
                      <Select
                        isRequired
                        className="w-full"
                        label="Sede"
                        name="sede"
                        placeholder="Seleccione la Sede"
                        labelPlacement="outside"
                        onChange={handleSedeId}
                      >
                        {sedes.map((sede) => (
                          <SelectItem key={sede.id}>
                            {sede.direction}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    {selectedCategory === "Smartphones" && (
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-8">
                          <Input
                            name="ram"
                            label="RAM:"
                            defaultValue={name}
                            labelPlacement="outside"
                            isRequired
                            placeholder="Introduce la RAM del Producto."
                            type="text"
                          />
                          <Input
                            name="storage"
                            label="Storage:"
                            defaultValue={name}
                            labelPlacement="outside"
                            isRequired
                            placeholder="Introduce el almacenamiento del Producto."
                            type="text"
                          />
                        </div>
                        <div className="flex gap-8">
                          <Input
                            name="front"
                            label="MPX Frontal:"
                            defaultValue={name}
                            labelPlacement="outside"
                            isRequired
                            placeholder="Introduce los mpx frontal del Producto."
                            type="text"
                          />
                          <Input
                            name="back"
                            label="MPX Trasera:"
                            defaultValue={name}
                            labelPlacement="outside"
                            isRequired
                            placeholder="Introduce los mpx traseros del Producto."
                            type="text"
                          />
                        </div>
                      </div>
                    )}
                    <Rating
                      ratingValue={ratingValue}
                      setRatingValue={setRatingValue}
                    />
                    <div className="flex justify-between w-full gap-8">
                      <Input
                        label="Precio"
                        name="price"
                        isRequired
                        defaultValue={price?.toString()}
                        labelPlacement="outside"
                        placeholder="0.00"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        type="number"
                      />
                      <Input
                        label="Cantidad"
                        required
                        isRequired
                        name="inventoryCount"
                        defaultValue={inventoryCount?.toString()}
                        labelPlacement="outside"
                        placeholder="Introduce la cantidad"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end p-5 w-full gap-8">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      setRatingValue(0);
                    }}
                  >
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit" disabled={loading}>
                    {loading && <Spinner color="default" />}
                    {!loading && "Guardar"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalAddProduct;
