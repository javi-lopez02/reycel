import React from 'react';
import Tooltip from './Tooltip';

interface OrderSummaryProps {
  price: number;
  quantity: number;
  hasExpressDelivery: boolean;
  onExpressDeliveryChange: (value: boolean) => void;
  expressDeliveryCost: number;
  currency?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  price,
  quantity,
  hasExpressDelivery,
  onExpressDeliveryChange,
  expressDeliveryCost,
  currency = '$'
}) => {
  const deliveryCost = hasExpressDelivery ? expressDeliveryCost : 0;
  const total = price + deliveryCost;

  const formatPrice = (amount: number) => {
    return `${currency}${amount.toFixed(2)}`;
  };

  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-md font-medium text-gray-700">Resumen del Pedido</h3>
        <Tooltip content="Resumen de su compra con el precio por unidad, cantidad, y el costo total incluyendo la entrega.">
        </Tooltip>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Precio unitario:</span>
          <span className="font-medium">{formatPrice(price)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Cantidad:</span>
          <span className="font-medium">{quantity}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Entrega Rápida:</span>
            <Tooltip content="Seleccione esta opción para recibir su pedido más rápido con un costo adicional.">
            </Tooltip>
          </div>
          
          <div className="flex items-center">
            {hasExpressDelivery && (
              <span className="mr-2 text-sm text-blue-600 font-medium">
                +{formatPrice(expressDeliveryCost)}
              </span>
            )}
            <label htmlFor="express-delivery" className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="express-delivery"
                checked={hasExpressDelivery}
                onChange={(e) => onExpressDeliveryChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-medium text-base">
            <span className="text-gray-800">Precio Total:</span>
            <span className="text-blue-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;