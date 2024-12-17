import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../Icons";
import { useState } from "react";
import Selected from "./Selected";
import Rating from "./Rating";

function ModalAddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ratingValue, setRatingValue] = useState(0);
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
                Agregar Porducto
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-[auto_auto] gap-5 max-lg:grid-cols-1">
                  <div className="flex flex-col items-start justify-start w-96 h-auto">
                    <img
                      className="h-[500px] w-full bg-neutral-300"
                      src="https://expresssolutionscuba.com/wp-content/uploads/2024/02/Celular-Samsung-Galaxy-A04e-Negro-64-3gb-6-5-A042mzkfaro-2-41015.webp"
                      alt="imagen de telefono"
                    />
                    <div className="pt-5">
                      {" "}
                      <h1>Introduce la url de la Imagen</h1>{" "}
                      <Input
                        size="sm"
                        color="primary"
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
                      label="Nombre:"
                      labelPlacement="outside"
                      isRequired
                      placeholder="Introduce el nombre del Producto."
                      type="text"
                    />
                    <Textarea
                      label="Descripción:"
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
                        label="Price"
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
                        labelPlacement="outside"
                        placeholder="Introduce la cantidad"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAddProduct;
