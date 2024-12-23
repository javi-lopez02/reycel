import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { FC } from "react";
import useUser from "../../customHooks/useUser";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddSede: FC<Props> = ({ isOpen, onClose }) => {
  const { users } = useUser();

  return (
    <>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Agregar Sede</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <div className="flex flex-col gap-4 min-w-full items-center">
                    <img
                      className="w-4/5 h-52 bg-neutral-300 rounded-lg"
                      src={"./logo.webp"}
                      alt="imagen de telefono"
                    />
                    <Input
                      label="Introduce la url de la Imagen"
                      labelPlacement="outside"
                      name="imageUrl"
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
                  <div className="flex gap-2 min-w-full">
                    <Input
                      autoFocus
                      startContent={
                        <span className="text-sm text-default-800 pointer-events-none flex-shrink-0">
                          +53
                        </span>
                      }
                      endContent={
                        <svg
                          className="w-6 h-6 text-gray-500 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      }
                      label="Telefono"
                      placeholder="XXXXXXXX"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Select
                      variant="bordered"
                      label="Trabajador"
                      placeholder="Seleccione el Trabajador"
                      labelPlacement="outside"
                    >
                      {users &&
                        users.map((user) => (
                          <SelectItem>{user.username}</SelectItem>
                        ))}
                    </Select>
                  </div>
                  <Textarea
                    label="Direccion:"
                    name="direccion"
                    isRequired
                    labelPlacement="outside"
                    placeholder="Introduce la direccion de la sede."
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddSede;
