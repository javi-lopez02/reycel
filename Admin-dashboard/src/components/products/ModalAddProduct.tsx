import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../Icons";
import { FC, useState } from "react";
import Selected from "./Selected";
import Rating from "./Rating";
import { createProductRequest } from "../../services/product";
import { toast } from "sonner";
import { Products } from "../../type";

interface Props {
  setProducts: React.Dispatch<React.SetStateAction<Products[] | null>>;
}

const ModalAddProduct: FC<Props> = ({ setProducts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ratingValue, setRatingValue] = useState(0);
  const [loading, setLoading] = useState(false);
  /*  const [price, setPrice] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState(""); */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const categoryId = data["selected"] as string;
    const name = data["name"] as string;
    const price = parseInt(data["price"] as string);
    const description = data["description"] as string;
    const inventoryCount = parseInt(data["inventoryCount"] as string);
    const rating = ratingValue;
    const imagen = data["imageUrl"] as string;

    console.log({
      categoryId,
      name,
      price,
      description,
      inventoryCount,
      rating,
      imagen,
    });

    createProductRequest({
      categoryId,
      name,
      price,
      description,
      inventoryCount,
      rating,
      imagen,
    })
      .then((res) => {
        console.log(res.data.data);
        setProducts((prev) => {
          res.data.data.rating = rating;
          return prev ? [res.data.data, ...prev] : null;
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al crear el producto.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen} endContent={<PlusIcon />}>
        Nuevo Producto
      </Button>
      <Modal isOpen={isOpen} size="5xl" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl">Agregar Porducto</h1>
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-[auto_auto] gap-5 max-lg:grid-cols-1"
                >
                  <div className="flex flex-col items-start justify-start w-96 h-auto">
                    <img
                      className="h-[400px] w-full bg-neutral-300"
                      src="https://expresssolutionscuba.com/wp-content/uploads/2024/02/Celular-Samsung-Galaxy-A04e-Negro-64-3gb-6-5-A042mzkfaro-2-41015.webp"
                      alt="imagen de telefono"
                    />
                    <div className="pt-5">
                      {" "}
                      <h1>Introduce la url de la Imagen</h1>{" "}
                      <Input
                        size="sm"
                        color="primary"
                        name="imageUrl"
                        className="pt-3 w-96"
                        placeholder="url/imagen.com"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              https://
                            </span>
                          </div>
                        }
                        type="url"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[570px] space-y-12">
                    <Input
                      className="font-medium font-body text-lg"
                      name="name"
                      label="Nombre:"
                      labelPlacement="outside"
                      isRequired
                      placeholder="Introduce el nombre del Producto."
                      type="text"
                    />
                    <Textarea
                      label="Descripción:"
                      name="description"
                      labelPlacement="outside"
                      placeholder="Introduce la descripción del Producto."
                    />
                    <div className="flex justify-between items-center w-full">
                      <Rating
                        ratingValue={ratingValue}
                        setRatingValue={setRatingValue}
                      />
                      <Selected />
                    </div>
                    <div className="flex justify-between w-full gap-8">
                      <Input
                        label="Precio"
                        name="price"
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
                        name="inventoryCount"
                        labelPlacement="outside"
                        placeholder="Introduce la cantidad"
                        type="number"
                      />
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
                      <Button color="primary" type="submit" onPress={onClose}>
                        {loading && <Spinner color="primary" />}
                        {!loading && "Guardar"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddProduct;
