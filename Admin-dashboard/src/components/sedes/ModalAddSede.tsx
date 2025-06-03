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
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { FC, Key, useEffect, useRef, useState } from "react";
import { Sede, Workers } from "../../type";
import { toast } from "sonner";
import { getWorkersRequest } from "../../services/sedes";

interface Props {
  sede?: Sede;
  updateSede: (
    id: string,
    image: string,
    direction: string,
    phone: string,
    workers: Key[]
  ) => Promise<void>;
  addSede: (
    image: string,
    direction: string,
    phone: string,
    workers: Key[]
  ) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddSede: FC<Props> = ({
  isOpen,
  onClose,
  sede,
  addSede,
  updateSede,
}) => {
  const [usersModerador, setUsersModerador] = useState<Workers[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getWorkersRequest()
        .then((res) => {
          console.log(res.data.data)
          setUsersModerador(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al cargar los trabajadores");
        });
    }
  }, [isOpen, sede?.id]);

  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const imageUrl = data.imageUrl as string;
    const phone = data.phone as string;
    const direction = data.direction as string;

    if (
      !selectRef.current?.selectedOptions ||
      !imageUrl ||
      !phone ||
      !direction
    ) {
      toast.error("Debe introducir todos los datos del formulario.");
      return;
    }

    const select = Array.from(selectRef.current?.selectedOptions).flatMap(
      (value) => value.value
    );

    if (!sede?.id) {
      addSede(imageUrl, direction, phone, select)
        .then()
        .finally(() => {
          setLoading(false);
        });
    }

    if (sede?.id) {
      updateSede(sede.id, imageUrl, direction, phone, select)
        .then()
        .finally(() => {
          setLoading(false);
        });
    }
    onClose()
  };

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
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 min-w-full items-center">
                    <img
                      className="w-4/5 h-52 bg-neutral-300 rounded-lg"
                      src={"./logo.webp"}
                      alt="imagen de telefono"
                    />
                    <Input
                      label="Introduce la url de la Imagen"
                      labelPlacement="outside"
                      defaultValue={sede?.image}
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
                      name="phone"
                      autoFocus
                      defaultValue={sede?.phone}
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
                            fillRule="evenodd"
                            d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                            clipRule="evenodd"
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
                      ref={selectRef}
                      className="max-w-[225px]"
                      label="Trabajador"
                      defaultSelectedKeys={sede?.workers.flatMap(
                        (worker) => worker.id
                      )}

                      placeholder="Seleccione el Trabajador"
                      labelPlacement="outside"
                      selectionMode="multiple"
                    >
                      {usersModerador.map((user) => (
                        <SelectItem key={user.id}>{user.baseUser.username}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <Textarea
                    label="Direccion:"
                    name="direction"
                    defaultValue={sede?.direction}
                    isRequired
                    labelPlacement="outside"
                    placeholder="Introduce la direccion de la sede."
                  />
                  <div className="flex min-w-full justify-end mt-5 gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      {loading && <Spinner color="danger" />}
                      {!loading && <span>Guardar</span>}
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
