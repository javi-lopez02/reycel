import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  DatePicker,
} from "@nextui-org/react";
import { FC, useState } from "react";
import useProduct from "../../customHooks/useProduct";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const metodo = [
  { key: "USD", label: "USD" },
  { key: "EUR", label: "EUR" },
  { key: "CUP", label: "CUP" },
  { key: "MLC", label: "MLC" }
];

const ModalAddOrder: FC<Props> = ({ isOpen, onClose }) => {
  const { products } = useProduct();
  const [metod, setMetod] = useState<string | undefined>("USD");

  return (
    <>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Agregar Orden</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Select
                    selectionMode="multiple"
                    variant="bordered"
                    label="Producto"
                    placeholder="Seleccione los Productos"
                    labelPlacement="outside"
                  >
                    {products &&
                      products.map((product) => (
                        <SelectItem key={product.id}>{product.name}</SelectItem>
                      ))}
                  </Select>
                  <div className="flex gap-4 min-w-full">
                    <Select
                      className="min-w-4/5"
                      variant="bordered"
                      label="Metodo"
                      placeholder="Seleccione el Metodo del Pago"
                      labelPlacement="outside"
                      onSelectionChange={(key) => setMetod(key.currentKey)}
                    >
                      {metodo.map((metodo) => (
                        <SelectItem key={metodo.key}>{metodo.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      className="min-w-1/5"
                      startContent={
                        <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                          $
                        </span>
                      }
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          {metod}
                        </span>
                      }
                      disabled
                      label="Precio"
                      placeholder="Precio"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>

                  <DatePicker
                    variant="bordered"
                    label="Fecha"
                    labelPlacement="outside"
                  />
                  <div className="flex min-w-full justify-end mt-5 gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Agregar
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

export default ModalAddOrder;
