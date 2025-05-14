import React from "react";
import Tooltip from "./Tooltip";
import { Textarea } from "@heroui/react";

export type Municipality = {
  id: string;
  name: string;
};

interface AddressSelectorProps {
  municipalities: Municipality[];
  selectedMunicipality: string;
  onMunicipalityChange: (municipalityId: string) => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  municipalities,
  selectedMunicipality,
  onMunicipalityChange,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <h3 className="text-md font-medium text-gray-700">
          Información de Entrega
        </h3>
        <Tooltip content="Seleccione el municipio y proporcione la dirección completa para la entrega de su pedido."></Tooltip>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="municipality"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Municipio
          </label>
          <select
            id="municipality"
            value={selectedMunicipality}
            onChange={(e) => onMunicipalityChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
          >
            <option value="">Seleccionar municipio</option>
            {municipalities.map((municipality) => (
              <option key={municipality.id} value={municipality.id}>
                {municipality.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Textarea
            name="textarea"
            id="textarea"
            className="w-full"
            label="Dirección"
            placeholder="Ingrese su dirección completa para la entrega"
            
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSelector;
