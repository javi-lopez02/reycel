import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC } from "react";
import { BiRename } from "react-icons/bi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddCategory: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Agregar Categoría</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Input
                    autoFocus
                    endContent={
                      <BiRename className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Nombre"
                    placeholder="Inserte el Nombre de la categroría"
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <div className="flex min-w-full justify-end mt-5 gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" onPress={onClose}>
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

export default ModalAddCategory;
