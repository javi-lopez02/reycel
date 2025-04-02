import { ModalBody, Modal, ModalContent } from "@heroui/react";
import { FC } from "react";

interface ModalMessageEmailProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ModalMessageEmail: FC<ModalMessageEmailProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="center" size="xl">
        <ModalContent>
          <ModalBody>
            <div className="flex flex-col gap-6 self-center bg-blue-300 p-4 m-4 md:p-8 md:m-8 rounded-se-full rounded-es-full">
              <h1 className="text-center font-bold text-2xl">
                GRACIAS POR REGISTRARTE EN NUESTRA PLATAFORMA
              </h1>
              <h2 className="text-center font-semibold text-lg">
                Revise su correo, le hemos enviado un mensaje de confirmación de
                cuenta de usuario, por favor acéptela
              </h2>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalMessageEmail;
