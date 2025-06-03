import Tooltip from "./Tooltip";

const TransferIdInput = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <label
          htmlFor="transfer-id"
          className="block text-sm font-medium text-gray-700"
        >
          ID de Transferencia
        </label>
        <Tooltip content="Ingrese el número o código de identificación de su transferencia. Este número se encuentra en el comprobante de pago o en el historial de transacciones de su banco."></Tooltip>
      </div>

      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="transfer-id"
          id="transfer-id"
          className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
          placeholder="Ej: TR-123456789"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-red-500">*</span>
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Ingrese el ID de transferencia proporcionado por su banco o servicio de
        pago.
      </p>
    </div>
  );
};

export default TransferIdInput;
