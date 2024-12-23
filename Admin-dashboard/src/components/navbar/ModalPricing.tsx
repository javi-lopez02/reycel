import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

const ModalPricing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        placement="bottom"
        content={
          <div className="px-1">
            <div className="text-small font-bold">Sobre la tasa de cambio</div>
            <div className="flex flex-col items-center text-tiny justify-center font-medium">
              <p>1 USD = 0.95 EUR</p>
              <p>1 USD = 1.15 MLC</p>
              <p>1 USD = 310 CUP</p>
            </div>
          </div>
        }
      >
        <div
          onClick={onOpen}
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 11 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"
            />
          </svg>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Monedas
          </div>
        </div>
      </Tooltip>

      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Editar Tasa de Cambio</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <div className="flex gap-4 min-w-full">
                    <Input
                      className="min-w-1/5"
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
                      disabled
                      label="USD"
                      placeholder="1"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      className="min-w-1/5"
                      startContent={
                        <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                          $
                        </span>
                      }
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          MLC
                        </span>
                      }
                      label="MLC"
                      placeholder="MLC"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>
                  <div className="flex gap-4 min-w-full">
                    <Input
                      className="min-w-1/5"
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
                      disabled
                      label="USD"
                      placeholder="1"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      className="min-w-1/5"
                      startContent={
                        <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                          $
                        </span>
                      }
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          EUR
                        </span>
                      }
                      label="EUR"
                      placeholder="EUR"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>
                  <div className="flex gap-4 min-w-full">
                    <Input
                      className="min-w-1/5"
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
                      disabled
                      label="USD"
                      placeholder="1"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      className="min-w-1/5"
                      startContent={
                        <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                          $
                        </span>
                      }
                      endContent={
                        <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                          CUP
                        </span>
                      }
                      label="CUP"
                      placeholder="CUP"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>

                  <div className="flex min-w-full justify-end mt-5 gap-3">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Guardar
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

export default ModalPricing;
