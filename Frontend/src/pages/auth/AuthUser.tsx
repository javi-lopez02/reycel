/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Modal, ModalContent } from "@heroui/react";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";
import { useUserStore } from "../../store/useUserStore";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

function AuthUser({ isOpen, onOpenChange, onClose }: Props) {
  const { isAuth } = useUserStore();
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (isAuth) {
      onClose();
    }
  }, [isAuth]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              {isRegister && (
                <ModalRegister
                  onClose={onClose}
                  setIsRegister={setIsRegister}
                />
              )}
              {!isRegister && (
                <ModalLogin onClose={onClose} setIsRegister={setIsRegister} />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthUser;
