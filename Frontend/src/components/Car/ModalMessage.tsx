import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function ModalMessage({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirme su transferencia
              </ModalHeader>
              <ModalBody>
                <strong>Precio: </strong>
                <strong>Cantidad de Productos: </strong>
                <strong>
                  Entrega Rápida: <Checkbox />
                </strong>
                <strong>Precio Total: </strong>

                <div className="flex flex-col self-center mt-3 w-full items-center p-4 gap-1">
                  <strong>Tarjeta MLC: XXXX-XXXX-XXXX-XXXX</strong>
                  <strong>Tarjeta CUP: XXXX-XXXX-XXXX-XXXX</strong>

                  <strong className="mt-3">Ingrese el ID de Transacción:</strong>
                  <input
                    className="p-2 pl-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-4/5 flex self-center"
                    type="text"
                    placeholder="ID Transacción"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
