import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

const ModalTarjet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        placement="bottom"
        content={
          <div className="px-1">
            <div className="text-small font-bold">
              Sobre las tarjetas magnéticas
            </div>
            <div className="flex flex-col items-center text-tiny justify-center font-medium">
              <p>XXXX-XXXX-XXXX-XXXX CUP</p>
              <p>XXXX-XXXX-XXXX-XXXX MLC</p>
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
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M7 11H5v1h2v-1Zm4 3H9v1h2v-1Zm-4 0H5v1h2v-1ZM5 5V.13a2.98 2.98 0 0 0-1.293.749L.88 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM13 16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6Zm-1-8H9a1 1 0 0 1 0-2h3a1 1 0 1 1 0 2Zm0-3H9a1 1 0 0 1 0-2h3a1 1 0 1 1 0 2Z" />
            <path d="M11 11H9v1h2v-1Z" />
          </svg>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Tarjetas
          </div>
        </div>
      </Tooltip>
      <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Tarjetas Magnéticas</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <div className="mx-auto">
                    <RadioGroup orientation="horizontal">
                      <Radio value="Bandec">
                        <img
                          className="rounded-md w-28 h-14"
                          src="data:image/jpeg;base64,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"
                          alt="Tarjeta bpa"
                        />
                      </Radio>
                      <Radio value="BPA"><img
                          className="rounded-md w-28 h-14"
                          src="https://media.diariolasamericas.com/p/08a9e753c5262913be4253bf2336983f/adjuntos/216/imagenes/002/018/0002018550/855x0/smart/tarjeta-banco-popular-cubajpg.jpg"
                          alt="Tarjeta bpa"
                        /></Radio>
                    </RadioGroup>
                  </div>
                  <Input
                    className="min-w-1/5"
                    startContent={
                      <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                        #
                      </span>
                    }
                    endContent={
                      <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                        CUP
                      </span>
                    }
                    label="CUP"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <Input
                    className="min-w-1/5"
                    startContent={
                      <span className="text-md text-default-800 pointer-events-none flex-shrink-0">
                        #
                      </span>
                    }
                    endContent={
                      <span className="text-md text-default-400 pointer-events-none flex-shrink-0">
                        MLC
                      </span>
                    }
                    label="MLC"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    variant="bordered"
                    labelPlacement="outside"
                  />

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

export default ModalTarjet;
