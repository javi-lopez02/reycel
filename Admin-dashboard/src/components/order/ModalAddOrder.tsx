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
import { BiUser } from "react-icons/bi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  username: string | undefined
}

const status = [
  { key: "Completed", label: "Completado" },
  { key: "Canceled", label: "Cancelado" },
  { key: "Pendient", label: "Pendiente" },
];

const ModalAddOrder: FC<Props> = ({ isOpen, onClose, totalAmount, username }) => {

  return (
    <>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Confirmar Orden</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <div className="flex gap-2 min-w-full">
                    <Input
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          <BiUser />
                        </span>
                      }
                      label="Moderador"
                      variant="bordered"
                      labelPlacement="outside"
                      value={username}
                    />
                    <Input
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          USD
                        </span>
                      }
                      label="Precio"
                      variant="bordered"
                      labelPlacement="outside"
                      defaultValue={String(totalAmount)}
                    />
                  </div>
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

export default ModalAddOrder;
