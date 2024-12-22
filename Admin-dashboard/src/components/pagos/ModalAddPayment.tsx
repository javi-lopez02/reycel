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
import { FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const status = [
  { key: "Completed", label: "Completado" },
  { key: "Canceled", label: "Cancelado" },
  { key: "Pendient", label: "Pendiente" },
];

const ModalAddPayment: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Agregar Pago</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Input
                    autoFocus
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
                    label="Precio"
                    placeholder="Inserte el Precio"
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <Select
                    variant="bordered"
                    label="Estado"
                    placeholder="Seleccione el Estado del Pago"
                    labelPlacement="outside"
                  >
                    {status.map((status) => (
                      <SelectItem key={status.key}>{status.label}</SelectItem>
                    ))}
                  </Select>
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

export default ModalAddPayment;
