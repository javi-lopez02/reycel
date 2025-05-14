import React, { useState } from 'react';
import { IoHelpCircleOutline } from "react-icons/io5";

interface TooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  position = 'top', 
  children 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800'
  };

  return (
    <div className="relative inline-flex items-center">
      {children ? (
        <div 
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          className="inline-flex"
        >
          {children}
        </div>
      ) : (
        <button
          type="button"
          className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          aria-label="Show information"
        >
          <IoHelpCircleOutline size={16} />
        </button>
      )}
      
      {isVisible && (
        <div 
          className={`absolute z-50 w-64 rounded bg-gray-800 p-2 text-sm text-white shadow-lg ${positionClasses[position]} transition-opacity duration-200`}
          role="tooltip"
        >
          {content}
          <div 
            className={`absolute h-0 w-0 border-4 border-transparent ${arrowClasses[position]}`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;