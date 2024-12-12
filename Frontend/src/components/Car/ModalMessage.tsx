import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  Tooltip,
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
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./logo.webp" alt="Logo reycel" className="w-10 h-8" />
                <h1 className="text-2xl font-bold" >Confirme su Compra</h1>
              </ModalHeader>
              <ModalBody>
                <ul>
                  <li className="flex space-x-2">
                    <strong className="text-neutral-700/80">Precio: </strong>
                    <h1 className="font-semibold">500$</h1>
                  </li>
                  <li className="flex space-x-2">
                    <strong className="text-neutral-700/80">Cantidad de Productos: </strong>
                    <h1 className="font-semibold">25</h1>
                  </li>
                  <li className="flex justify-between">
                    <div className="flex space-x-2">
                      <strong className="text-neutral-700/80">Entrega Rápida: </strong>
                      <h1 className="font-semibold">40$</h1>
                    </div>
                    <Checkbox defaultSelected color="primary" />
                  </li>
                  <li className="flex space-x-2">
                    <strong className="text-neutral-700/80">Precio Total: </strong>
                    <h1 className="font-semibold">540$</h1>
                  </li>
                </ul>
                <div className="flex justify-center items-center pt-4">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="flex flex-col space-y-1">
                      <img
                        className="rounded-md w-60 h-25"
                        src="https://lademajagua.cu/wp-content/uploads/2024/02/unnamed-1-2.jpg"
                        alt="Tarjeta bpa" />
                      <Snippet symbol="CUP:" size="sm">XXXX-XXXX-XXXX-XXXX</Snippet>
                    </div>
                    <div className="flex flex-col space-y-1 ">
                      <img
                        className="rounded-md w-60 h-25"
                        src="https://lademajagua.cu/wp-content/uploads/2024/02/unnamed-1-2.jpg"
                        alt="Tarjeta bpa" />
                      <Snippet symbol="MLC:" size="sm">XXXX-XXXX-XXXX-XXXX</Snippet>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col self-center w-full gap-1 pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <strong className=" ml-1">Haga la Transferencia e ingrese el ID de Transacción:</strong>
                    <Tooltip
                      content={
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">Acerca de la Transferencia</div>
                          <div className="text-tiny">
                            <ol type="A">
                              <li className="font-medium pt-2">
                               - Copie el numero de la trajeta y haga la transferencia.
                              </li>
                              <li className="font-medium pt-1">
                               - Copie el codigo de verificaion del mensaje q le envian.
                              </li>
                              <li className="font-medium pt-1">
                               - Pegue el codigo en el campo para validar la compra.
                              </li>
                              <li className="font-medium pt-1">
                               - Espere la confirmación de la compra.
                              </li>
                            </ol>
                          </div>
                        </div>
                      }
                    >
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>

                    </Tooltip>
                  </div>
                  <input
                    className="p-2 pl-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-full flex"
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
