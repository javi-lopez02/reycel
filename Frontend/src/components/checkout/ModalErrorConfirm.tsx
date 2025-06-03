import Modal from "../Car/Modal";

interface ProductError {
  id: number;
  name: string;
  imagen: string;
  inventoryCount: number;
}

interface ModalErrorConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  errorProducts: ProductError[];
}
function ModalErrorConfirm({
  isOpen,
  onClose,
  errorProducts,
}: ModalErrorConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Error">
      <p className="text-lg font-medium pb-4">
        Los siguientes productos no tienen stock suficiente:
      </p>
      <div className="grid grid-cols-3 gap-4 ">
        {errorProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-md bg-gray-100 py-4 px-2 flex flex-col items-center"
          >
            <img
              src={product.imagen}
              alt={product.name}
              className="w-24 h-24 object-cover"
            />
            <p className="text-sm font-medium pt-2 hover:underline line-clamp-1">
              {product.name}
            </p>
            <p className="text-sm text-gray-500 pt-2">
              Disponibles: {product.inventoryCount}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

export default ModalErrorConfirm;
