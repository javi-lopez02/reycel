import {
  Avatar,
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
} from "@nextui-org/react";
import { FC } from "react";
import { BiLock, BiMailSend, BiUser } from "react-icons/bi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const role = [
  { key: "user", label: "Usuario" },
  { key: "moderator", label: "Moderador" },
];

const ModalAddUser: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Agregar Usuario</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="w-36 h-36" />
                      <Input
                        autoFocus
                        endContent={
                          <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Url Imagen"
                        placeholder="https://image.example"
                        variant="bordered"
                        labelPlacement="outside"
                      />
                      <Select
                        variant="bordered"
                        label="Role"
                        placeholder="Seleccione el role"
                        labelPlacement="outside"
                      >
                        {role.map((rol) => (
                          <SelectItem key={rol.key}>{rol.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Input
                        autoFocus
                        endContent={
                          <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Usuario"
                        placeholder="Entra el usuario"
                        variant="bordered"
                        labelPlacement="outside"
                      />
                      <Input
                        endContent={
                          <BiMailSend className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        placeholder="Entra el email"
                        variant="bordered"
                        labelPlacement="outside"
                      />
                      <Input
                        endContent={
                          <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Password"
                        placeholder="Entra el password"
                        type="password"
                        variant="bordered"
                        labelPlacement="outside"
                      />
                      <Input
                        endContent={
                          <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Confirmar Password"
                        placeholder="Confirma el password"
                        type="password"
                        variant="bordered"
                        labelPlacement="outside"
                      />
                    </div>
                  </div>
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

export default ModalAddUser;
