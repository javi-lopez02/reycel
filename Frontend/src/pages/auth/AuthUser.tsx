/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState} from "react";
import { useAuth } from "../../context/auth.context";
import { Modal, ModalContent } from "@nextui-org/react";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";

function AuthUser({ isOpen, onOpenChange, onClose }: { isOpen: boolean, onOpenChange: () => void, onClose: () => void }) {
  const { isAuth } = useAuth()
  const [isRegister, setIsRegister] = useState(false)

  useEffect(() => {
    if (isAuth) {
      onClose()
    }
  }, [isAuth])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
            {
              isRegister && (
                <ModalRegister onClose={onClose} setIsRegister={setIsRegister}/>
              )
            }
            {
              !isRegister &&(
                <ModalLogin onClose={onClose} setIsRegister={setIsRegister}/>
              )
            }
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthUser